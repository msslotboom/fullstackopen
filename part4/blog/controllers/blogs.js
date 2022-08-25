const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }  
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  })

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET) 
  }
  catch(err){
    if (err.name === "JsonWebTokenError"){
      return response.status(401).json({
        error: 'invalid token'
      })
    }
  }
  const decodedToken = jwt.verify(token, process.env.SECRET) 
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' }) 
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  if (blog.likes === undefined){
    blog.likes = 0
  }
  if (blog.title === undefined && blog.url === undefined){
    response.status(400)
  }
  else{
    blog.user = blog.user.concat(user.id)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)

  const token = getTokenFrom(request)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET) 
  }
  catch(err){
    if (err.name === "JsonWebTokenError"){
      return response.status(401).json({
        error: 'invalid token'
      })
    }
  }
  const decodedToken = jwt.verify(token, process.env.SECRET) 
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' }) 
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
  if (user.id === blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    response.status(401).json({error: 'You do not have the right to remove this blog'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogContent = request.body
  logger.info(request.body)
  await Blog.findByIdAndUpdate(blogContent.id, blogContent)
  response.json(blogContent)
})


module.exports = blogsRouter