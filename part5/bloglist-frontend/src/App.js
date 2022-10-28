import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({message}) => {
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
    {handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password}
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
  //const [newBlogVisible, setNewBlogVisible] = useState(false)


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


  const BlogFormRef = useRef()

  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog))
    BlogFormRef.current.toggleVisibility()
  }


  // const blogForm = () => {
  //   const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  //   const showWhenVisible = { display: newBlogVisible ? '' : 'none' }
  //   return (
  //     <div>
  //       <div style={hideWhenVisible}>
  //         <button onClick={() => setNewBlogVisible(true)}>log in</button>
  //       </div>
  //       <div style={showWhenVisible}>
  //           <BlogForm
  //           setNewMessage = {setNewMessage}
  //           blogs = {blogs}
  //           setBlogs = {setBlogs}
  //           />
  //         <button onClick={() => setNewBlogVisible(false)}>cancel</button>
  //       </div>
  //     </div>
  //   )
  // }
  
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
      
      {/* <Togglable buttonLabel="new note">
        <BlogForm createNote={addNote} />
      </Togglable> */}

      <Togglable buttonLabel="new note" ref={BlogFormRef}>
      <BlogForm 
      addBlog = {addBlog} 
      setNewMessage={setNewMessage}/>
      </Togglable>

      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
