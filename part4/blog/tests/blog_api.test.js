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

afterAll(() => {
  mongoose.connection.close()
})