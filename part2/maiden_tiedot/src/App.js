import countryService from './services/countries.js';
import { useState, useEffect} from 'react';

const App = () => {

  const [countries, setCountries] = useState([])
  const [filterValue, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
    },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  

  return (
    <div>
      <Filter filterValue = {filterValue} handleFilterChange = {handleFilterChange}/>
      <ListCountries filterValue = {filterValue} countries = {countries}/>
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

const ListCountries = ({countries, filterValue}) => {
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterValue))
  const nrCountry = countriesToShow.length
  if (nrCountry === 1){
    const languageList = countriesToShow[0].languages
    return(
      <div>
        <h2>{countriesToShow[0].name.common}</h2>
        capital {countriesToShow[0].capital}<br/>
        area {countriesToShow[0].area}<br/>
        <h3>languages:</h3>
        {Object.keys(languageList).map(key =>
          <li>{languageList[key]}</li>
        )}
        <br/>
        <img src = {countriesToShow[0].flags.png} alt ='country flag' width="200" length="200"/>
      </div>
    )
  }
  else if (nrCountry > 5){
    return(
      <div>Too many matches, specify another filter</div>
    )
  }
  return(
    <>{countriesToShow.map(country =>
      <div key = {country.name.common}>{country.name.common}</div>
    )}</>
  )
}

export default App;
