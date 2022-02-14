const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')

// let persons = [  
//     {
//         "name": "Arto Hellas",
//         "number": "040-123456",
//         "id": 1
//       },
//       {
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523",
//         "id": 2
//       },
//       {
//         "name": "Dan Abramov",
//         "number": "12-43-234345",
//         "id": 3
//       },
//       {
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122",
//         "id": 4
//       },
//       {
//         "name": "test",
//         "number": "3",
//         "id": 5
//       }
// ]


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(notes => {
    res.json(notes)
  })
})

// app.get('/info', (req, res) => {
//     res.send(`<div>Phonebook has info for ${persons.length} people<br/>
//     ${new Date()}
//     </div>`)
// })


// app.get('/api/persons/:id', (request, response) => {
//   Person.find({}).then(notes => {
//     response.json(notes)
//   })
//   const id = Number(request.params.id)
//   const note = persons.find(person => person.id === id)
//   if (note){
//       response.json(note)
//   }
//   else{
//       response.status(404).end()
//   }
// })

app.post('/api/persons', (request, response) => {
    //morgan(':method :url :response-time ms :data')
    const body = request.body
    console.log(body.name)
    if (body.name === undefined) {
      console.log('fail')
      return response.status(400).json({ error: 'content missing' })
    }
    console.log('aaa')
    const person = new Person({
      name: body.name,
      number: body.number
    })
    console.log('test')
    console.log(person)
    person.save().then(savedPerson => {
      console.log(person)
      response.json(savedPerson)
    })
})

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)
  
//     response.status(204).end()
//   })
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})