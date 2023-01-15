import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message }) => {
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

const LoginForm = (
  { handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password }
) => {
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setNewMessage] = useState(null)
  const BlogFormRef = useRef()


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

  const increaseLikeHandler = (blog) => {
    if (isNaN(blog.likes)) {
      blog.likes = 0
    }

    const blogObject = {
      title: blog.title,
      id: blog.id,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    blogService.update(blogObject.id, blogObject)
    console.log(blogObject)
    const index = blogs.findIndex(x => {
      if (x.id === blogObject.id){
        return true
      }
    })
    const newBlogs = [...blogs]
    newBlogs[index] = blogObject
    setBlogs(newBlogs)

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
      setNewMessage(['wrong username or password', false])
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



  if (user === null) {
    return (
      <div>
        <Notification
          message = {message}
        />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message = {message}
      />
      <div value>{user.name} logged in <LogoutButton/></div>

      <Togglable buttonLabel="new note" ref={BlogFormRef}>
        <BlogForm
          blogs = {blogs}
          setBlogs = {setBlogs}
          setNewMessage={setNewMessage}
          BlogFormRef = {BlogFormRef}
        />
      </Togglable>

      <br/>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs = {setBlogs}
          allBlogs = {blogs}
          handleLikeIncrease = {increaseLikeHandler}
        />
      )}
    </div>
  )
}

export default App
