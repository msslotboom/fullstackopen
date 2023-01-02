import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setNewMessage, BlogFormRef}) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const postBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))
    BlogFormRef.current.toggleVisibility()
    console.log(blogObject.title, blogObject.author)
    setNewMessage([`a new blog ${blogObject.title} by ${blogObject.author} added`], true)
      setTimeout(() => {
        setNewMessage(null)
        }, 5000
      )
  }
  return(
    <div>
      <h2>Create new</h2>
          <form onSubmit={postBlog}>
            <div>
              title:
              <input
              type="text"
              value={title}
              onChange={
                ({target}) => setTitle(target.value)
              }
              />
            </div>
            <div>
              author:
              <input
              type="text"
              value={author}
              onChange={
                ({target}) => setAuthor(target.value)
              }
              />
            </div>
            <div>
              url:
              <input
              type="text"
              value={url}
              onChange={
                ({target}) => setUrl(target.value)
              }
              />
            </div>
            <button type="submit">submit</button>
          </form>
    </div>
  )
}

export default BlogForm