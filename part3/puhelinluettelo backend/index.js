const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

let persons = [  
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "test",
        "number": "3",
        "id": 5
      }
]
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

//morgan()
//morgan.token('data', function getData (req){
//  return JSON.stringify(req.body)
//})


app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/info', (req, res) => {
    res.send(`<div>Phonebook has info for ${persons.length} people<br/>
    ${new Date()}
    </div>`)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(person => person.id === id)
    if (note){
        response.json(note)
    }
    else{
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    //morgan(':method :url :response-time ms :data')
    const person = request.body
    const generateId =() => {
      return Math.floor(Math.random()*10000001)
    }
    if (!person.name || !person.number){
      return response.status(400).json({
        error: "content missing"
      })
    }
    else if (persons.find(person1 => person1.name === person.name)){
      return response.status(400).json({
        error:"person already in database"
      })
    }

    person.id = generateId()
    response.json(person)
    persons = persons.concat(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})