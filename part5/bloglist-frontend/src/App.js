import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setNewMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
  
    try {
      const user = await loginService.login({
        username, password,      
      })
      window.localStorage.setItem(        
        'loggedNoteappUser', JSON.stringify(user)      
      ) 
      setUser(user)
      setUsername('')
      setPassword('')    
      blogService.setToken(user.token)
    } 
    catch (exception) {   
      console.log('wrong credentials')
      setNewMessage([`wrong username or password`, false])
      setTimeout(() => {
        setNewMessage(null)
        }, 5000
      )

    }
  }

  const LogoutButton = () => {
    return(
      <button key = "lougout" onClick = {() => logoutHandler()}>Logout</button>
    )
  }

  const Notification = () => {
    if (message === null) {
      return null
    }
    else if (message[1] === false) {
      return(
        <div key = {message[1]} className="error">
        {message[0]}
      </div>
      )
  
    }
    return (
      <div key = {message[1]} className="success">
        {message[0]}
      </div>
    )
  }

  const postBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService.create(blogObject)
    //setBlogs(blogs.concat(blogObject))
    console.log(blogObject.title, blogObject.author)
    setNewMessage([`a new blog ${blogObject.title} by ${blogObject.author} added`], true)
      setTimeout(() => {
        setNewMessage(null)
        }, 5000
      )
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification/>
        <form onSubmit={handleLogin}> 
        <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={
                ({ target }) => setUsername(target.value)
              }
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={
                ({ target }) => setPassword(target.value)
              }          
            />        
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div value>{user.name} logged in</div>
      <LogoutButton/>
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
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
