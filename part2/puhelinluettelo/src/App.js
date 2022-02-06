import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  
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
    let errorValue = false
    const index = persons.findIndex(person => {
      if (person.name === newName){
        return true
      }
    })
    if(persons.some(person => person.name === newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        //console.log(persons)
        personObject.id = persons.find(person => person.name === newName).id
        personService.update(personObject.id, personObject)
        .catch(error => {
          setNewMessage(
            [`Note '${personObject.name}' was already removed from server`, false]
          )
          errorValue = true
          //console.log('error happened', errorValue)
          setTimeout(() => {
            setNewMessage(null)
          }, 5000)
          const newPersons = [...persons]
          newPersons.splice(index,1)
          setPersons(newPersons)
          })
        
        

        
        if (errorValue === false){
          
          const personscopy = [...persons]
          personscopy[index] = personObject
          setPersons(personscopy)
          setNewMessage([`Updated ${personObject.name}`, true])
          setTimeout(() => {
            setNewMessage(null)
            }, 5000
          )
        }
      }
    }
    else{
      const promiseResult = personService.create(personObject)
      //const newpersons = personService.getAll
      promiseResult.then(
        person => {
          personObject.id = person.id
        }
      )
      setPersons(persons.concat(personObject))
      setNewMessage([`Added ${personObject.name}`,true])
      setTimeout(() => {
        setNewMessage(null)
        }, 5000
      )
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
      <Notification message = {newMessage}/>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <h3>Add a new</h3>
        <PersonForm addPerson = {addPerson} 
        newName={newName} handleNameChange= {handleNameChange} 
        newNumber = {newNumber} handleNumberChange= {handleNumberChange}/>
      <h3>Numbers</h3>
      <ListNumbers people = {persons} filter = {newFilter} setPersons = {setPersons} setNewMessage = {setNewMessage}/>
    </div>
  )

}
const ListNumbers = (props) => {
  const persons = props.people
  const filter = props.filter.toLowerCase()
  const setPersons = props.setPersons
  const setNewMessage = props.setNewMessage

  const clickHandler = (props) => {
    //console.log(props)
    const name = props.name
    const id = props.id
    //console.log(id)
    if (window.confirm(`Delete ${name} ?`)){
      //console.log('removing')
      personService.remove(id)
      setPersons(persons.filter(person =>
        person.id !== id
        ))
      setNewMessage([`Removed ${name}`, true])
      setTimeout(() => {
        setNewMessage(null)
        }, 5000
      )
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
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else if (message[1] === false) {
    return(
      <div className="error">
      {message[0]}
    </div>
    )

  }
  return (
    <div className="success">
      {message[0]}
    </div>
  )
}
export default App
