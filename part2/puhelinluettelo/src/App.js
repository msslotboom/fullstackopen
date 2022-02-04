import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    //console.log(persons.some(person => person.name === newName))
    if (persons.some(person => person.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
    }
    else{
    setPersons(persons.concat(personObject))
    //console.log('button clicked', personObject)
    }
  }
  const handleChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value = {newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ListNumbers people = {persons}/>
    </div>
  )

}
const ListNumbers = (props) => {
  //console.log(props)
  const persons = props.people
  //console.log('persons',persons)
  return(
    <>{persons.map(person => 
    <div key={person.name}>{person.name}</div>
    )}</>
  )
}
export default App