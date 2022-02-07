import countryService from './services/countries.js';
import { useState, useEffect} from 'react';

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterValue, setFilter] = useState('')
  const[oneCountry, setOneCountry] = useState([false,[]])
  useEffect(() => {
    countryService.getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
    },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setOneCountry(false,[])
  }
  

  return (
    <div>
      <Filter filterValue = {filterValue} handleFilterChange = {handleFilterChange}/>
      <ListCountries filterValue = {filterValue} countries = {countries} oneCountry = {oneCountry} setOneCountry = {setOneCountry}/>
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

const ListCountries = ({countries, filterValue, oneCountry, setOneCountry}) => {
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterValue))
  const nrCountry = countriesToShow.length
  const showCountry = (country) => {
    oneCountry = true
    //console.log('countrytoshow',country)
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
    //console.log('onecountry',countriesToShow[0])
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
