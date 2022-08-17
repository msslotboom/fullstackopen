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
        likes: 0,
        userId: '62fbac956cd5c2b994e867af'
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
    expect(newBlogFromDb.likes).toBe(0)
})

test('400 Bad Request if no title or url', async () => {
    const newBlog = {
        author: 'Mikael'
    }
    post = api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('Test deleting a blog', async () => {
    const blogs = await api.get('/api/blogs')
    const testblog = await blogs.body.find(blog => blog.title === 'TestBlog')
    await api.delete(`/api/blogs/${testblog.id}`)
    const updatedBlogs = await api.get('/api/blogs')
    const newTestBlog = updatedBlogs.body.find(blog => blog.title === 'TestBlog')
    expect(newTestBlog).toBe(undefined)
})

test('Test updating a blog', async () => {
    const blogs = await api.get('/api/blogs')
    const testblog = await blogs.body.find(blog => blog.title === 'TestBlog')
    originalLikes = testblog.likes
    testblog.likes = testblog.likes + 1
    response = await api.put(`/api/blogs/${testblog.id}`).send(testblog)
    const newBlogContent = response.body
    expect(newBlogContent.likes).toBe(originalLikes +1)
})


afterAll(() => {
  mongoose.connection.close()
})