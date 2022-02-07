import countryService from './services/countries.js';
import weatherService from './services/weather.js'
import { useState, useEffect} from 'react';

const App = () => {
  const APIkey = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [filterValue, setFilter] = useState('')
  const[oneCountry, setOneCountry] = useState([false,[]])
  //const [city,setCity] = useState(' ')
  const [capitalWeather, setCapitalWeather] = useState([])
  const [startWeather, setStartWeather] = useState(false)

  useEffect(() => {
    countryService.getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
    },[])
    // useEffect(() => {
    //   weatherService.getAll()
    //   .then(weather => {
    //     setWeather(weather)
    //   })
    //   },[])
    // console.log(weather)
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    //console.log(event.target.value)
    //setOneCountry([oneCountry[0],oneCountry[1]])
    if (event.target.value === ''){
      //console.log('check')
      setOneCountry([false,[]])
    }
  }
  const handleOneCountry = (oneCountry) => {
    setOneCountry(true,oneCountry)
  }
  return (
    <div>
      <Filter filterValue = {filterValue} handleFilterChange = {handleFilterChange}/>
      <ListCountries filterValue = {filterValue} countries = {countries} oneCountry = {oneCountry} setOneCountry = {setOneCountry} setCapitalWeather = {setCapitalWeather} capitalWeather = {capitalWeather}/>
      <ShowWeather city={oneCountry} capitalWeather = {capitalWeather} setCapitalWeather = {setCapitalWeather} setStartWeather = {setStartWeather} startWeather = {startWeather}/>
    </div>
    
  );
}


const Filter = ({filterValue, handleFilterChange}) => {
  return(
    <div>
    filter shown with <input value = {filterValue} onChange={handleFilterChange}/>
    </div>
  )
}
const ShowWeather = ({city, capitalWeather, setCapitalWeather,setStartWeather, startWeather}) => {
  //console.log('city2',city)

  useEffect(() => {
    if (city[0] === true){
    weatherService.getCity(city[1].capital)
    .then(weather => {
      //console.log('retrieved weather')
      setCapitalWeather(weather)
      setStartWeather(true)
    })
    .catch(error =>{
      //console.log('fail', error)
    })
  }
  },[city])
  //console.log(capitalWeather.length)
  if (city[0] === true && capitalWeather !== [] && startWeather){
    //setTimeout(() => {console.log('timeout')},5000)
    //console.log('weather when capital not []',capitalWeather)
    //console.log('test2',capitalWeather !== [])
    //console.log(capitalWeather.list[0].main.temp)
    let imgsrc = 'http://openweathermap.org/img/wn/'+ capitalWeather.list[0].weather[0].icon + '@2x.png'
    //console.log(imgsrc)
    return(
      <>
      <h3>Weather in {city[1].capital}</h3>
        <div>temperature {capitalWeather.list[0].main.temp} Celsius</div>
        <img src={imgsrc}/><br/>
        <div>wind {capitalWeather.list[0].wind.speed} m/s</div>
      </>
    )
  }
  else{
    return null
  }

  
}
const ListCountries = ({countries, filterValue, oneCountry, setOneCountry}) => {
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterValue))
  const nrCountry = countriesToShow.length
  const showCountry = (country) => {
    //console.log('country', country)
    //handleOneCountry([true, oneCountry])
    const languageList = country.languages
    return(
      <div>
        <h2>{country.name.common}</h2>
        capital {country.capital}<br/>
        area {country.area}<br/>
        <h3>languages:</h3>
        {Object.keys(languageList).map(key =>
          <li key ={key}>{languageList[key]}</li>
        )}
        <br/>
        <img src = {country.flags.png} alt ='country flag' width="200" length="200"/>
      </div>
    )
  }
  useEffect(()=> {
    if (countriesToShow.length === 1){
      //console.log('useeffect happening')
      setOneCountry([true,countriesToShow[0]])
    } 
  },[countriesToShow.length])
  //const showEvent = ({country}) => {
  //  showCountry(country)
  //}
  //console.log(oneCountry)
  if (oneCountry[0] === true){
    return (
      showCountry(oneCountry[1])
    )
  }
  else if (nrCountry === 1){
    return(
    showCountry(countriesToShow[0])
    
    )
  }
  else if (nrCountry > 5){
    return(
      <div>Too many matches, specify another filter</div>
    )
  }
  return(
    <>{countriesToShow.map(country =>
      <div key = {country.name.common}>{country.name.common}<button onClick={() => {setOneCountry([true, country])}}>Show</button></div>
    )}</>
  )
}

export default App;
