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
          <span id="blogUrl">{blog.url}</span>
          <br />
          <span id="blogLikes">{blog.likes}</span>
          <button onClick={() => addLike(blog.id)}>like</button>
          <br />
          <span id="blogAuthor">{blog.author}</span>
          <br />
          <button onClick={() => removeBlog(blog.id)}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
