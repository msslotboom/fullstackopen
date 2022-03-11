const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const schema = require('./models/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = schema.blogSchema
const blogsRouter = require('./controllers/blogs')
const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
//____________________________________

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(morgan('tiny'))
// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })