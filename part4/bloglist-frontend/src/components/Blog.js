import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (id) => {
    updateBlog(id)
  }

  const removeBlog = (id) => {
    deleteBlog(id)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable openLabel='view' closeLabel='hide'>
        <div>
          {blog.url}
          <br />
          {blog.likes} <button onClick={() => addLike(blog.id)}>like</button>
          <br />
          {blog.author}
          <br />
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
