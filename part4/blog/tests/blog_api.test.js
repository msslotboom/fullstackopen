const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
{
    title: 'TestBlog',
    author: 'Mikael',
    url: '/testblog',
    likes: 1
},
{
    title: 'Second test blog',
    author: 'Mikael',
    url: '/secondtest',
    likes: 0
}
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()})


test('notes are returned as json of length 1', async () => {
  const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/).expect(200)
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field has name id', async () => {
    const response = await api.get('/api/blogs')
    for (const blogpost of response.body){
        // console.log(blogpost)
        expect(blogpost.id).toBeDefined()
    }
})

test('test post function', async () => {
    const newBlog = {
        title: 'A new blog post',
        author: 'Mikael',
        url: '/newpost',
        likes: 0
    }
    const baseBlogs = await api.get('/api/blogs')
    const post =  await api.post('/api/blogs').send(newBlog)
    const newBlogs = await api.get('/api/blogs')
    expect(newBlogs.body.length - baseBlogs.body.length).toBe(1)
    expect(newBlogs.body.includes(newBlog))
})

test('No like in post request creates likes = 0 in the db', async () => {
    const newBlog = {
        title: 'blog with no like field',
        author: 'Mikael',
        url: '/nolikes'
    }
    const post =  await api.post('/api/blogs').send(newBlog)
    const newBlogs = await api.get('/api/blogs')
    const newBlogFromDb =  newBlogs.body.find(blog => blog.url === '/nolikes')
    console.log(newBlogFromDb)
    expect(newBlogFromDb.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})