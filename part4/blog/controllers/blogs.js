const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
  //const userId = request.body.userId
  const blog = new Blog(request.body)
  if (blog.likes === undefined){
    blog.likes = 0
  }
  if (blog.title === undefined && blog.url === undefined){
    response.status(400)
  }
  else{
    const user = await User.findOne()
    blog.user = blog.user.concat(user.id)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    response.status(201).json(savedBlog)
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