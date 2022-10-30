import {useState} from 'react'

const Blog = ({blog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return(
  <div key = {blog.id} style = {blogStyle}>
    <div style = {hideWhenVisible}>
      {blog.title} <button onClick={toggleVisibility}>View</button>
    </div>

    <div style = {showWhenVisible}>
      {blog.title}  <button onClick={toggleVisibility}>Hide</button><br/>
      {blog.url}<br/>
      likes {blog.likes} <button>like</button><br/>
      {blog.author}
    </div>
    
  </div>  
  )
}

export default Blog