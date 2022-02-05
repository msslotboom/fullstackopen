import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    personService.getAll()
    .then(initalPersons => {
      //console.log(initalPersons)
      setPersons(initalPersons)
    })
    },[])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
    setPersons(persons.concat(personObject))
    personService.create(personObject)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <h3>Add a new</h3>
        <PersonForm addPerson = {addPerson} 
        newName={newName} handleNameChange= {handleNameChange} 
        newNumber = {newNumber} handleNumberChange= {handleNumberChange}/>
      <h3>Numbers</h3>
      <ListNumbers people = {persons} filter = {newFilter} setPersons = {setPersons}/>
    </div>
  )

}
const ListNumbers = (props) => {
  const persons = props.people
  const filter = props.filter.toLowerCase()
  const setPersons = props.setPersons

  const clickHandler = (props) => {
    console.log(props)
    const name = props.name
    const id = props.id
    console.log(id)
    if (window.confirm(`Delete ${name} ?`)){
      console.log('removing')
      personService.remove(id)
      setPersons(persons.filter(person =>
        person.id != id
        ))
    }
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  return(
    <>
    {personsToShow.map(person =>
    <div key={person.name}>{person.name} {person.number}<button key = {person.name} onClick={() => clickHandler(person)}>delete</button></div>
    )}</>
  )
}

const Filter = (props) => {
  const newFilter = props.newFilter
  const handleFilterChange = props.handleFilterChange
  return(
    <div>
    filter shown with <input value = {newFilter} onChange={handleFilterChange}/>
    </div>
  )
}
const PersonForm = (props) => {
  const addPerson = props.addPerson
  const newName = props.newName
  const handleNameChange = props.handleNameChange
  const newNumber = props.newNumber
  const handleNumberChange = props.handleNumberChange
  return(
    <form onSubmit={addPerson}>
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default App
