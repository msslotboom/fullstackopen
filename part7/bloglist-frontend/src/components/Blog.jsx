import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, allBlogs, setBlogs, handleLikeIncrease }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const deleteBlog = (blog) => {
    if (
      window.confirm("Remove blog " + blog.title + " by " + blog.author + "?")
    ) {
      blogService.remove(blog.id);

      const newBlogs = allBlogs.filter((blogs) => blogs.id !== blog.id);
      setBlogs(newBlogs);
    }
  };

  return (
    <div key={blog.id} style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>Hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}{" "}
        <button onClick={() => handleLikeIncrease(blog)}>like</button>
        <br />
        {blog.author}
        <br />
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
