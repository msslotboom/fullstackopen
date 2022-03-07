//const http = require('http')
const express = require('express')
const morgan = require('morgan')
//onst postmorgan = require('morgan')
const app = express()
const cors = require('cors')
//const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')



app.use(express.json())
//app.use(morgan('tiny'))
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))



app.get('/api/persons', (req, res) => {
  Person.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/persons/:id', (request, response,next) => {
  console.log('test2')
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        console.log(person)
        response.json(person)
      } else {
        console.log('test')
        response.status(404).end()
      }
    }).catch(error => next(error))
})


app.post('/api/persons', (request, response,next) => {
  //morgan.token(':method :url :status :res[content-length] - :response-time ms :data')
  //morgan(':method :url :response-time ms :data')
  const body = request.body
  if (body.name === undefined|| body.name === '') {
    return response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request,response,next) => {
  Person.findByIdAndUpdate(
    { _id: request.params.id },
    { number: request.body.number
    }
  )
    .then(
      response.status(200).end()
    )
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})