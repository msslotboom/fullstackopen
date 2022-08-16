const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
    response.json(blogs)
  })

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined){
    blog.likes = 0
  }
  if (blog.title === undefined && blog.url === undefined){
    response.status(400)
  }
  else{

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogContent = request.body
  logger.info(request.body)
  await Blog.findByIdAndUpdate(blogContent.id, blogContent)
  response.json(blogContent)
})


module.exports = blogsRouter