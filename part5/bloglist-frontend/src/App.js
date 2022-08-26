import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    }
  }

  const LogoutButton = () => {
    return(
      <button onClick = {() => logoutHandler()}>Logout</button>
    )
  }

  const postBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    console.log(blogObject)
    blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
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
