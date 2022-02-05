import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      <ListNumbers people = {persons} filter = {newFilter}/>
    </div>
  )

}
const ListNumbers = (props) => {
  const persons = props.people
  const filter = props.filter.toLowerCase()
  //console.log(filter)
  //console.log(persons[0].name.toLowerCase().includes('a'))
  const numbersToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  return(
    <>{numbersToShow.map(person => 
    <div key={person.name}>{person.name} {person.number}</div>
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
