import React from 'react'
import { useDispatch } from 'react-redux'

import Togglable from './Togglable'
import { likedBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blog) => {
    dispatch(likedBlog(blog))
    dispatch(setNotification(`Liked the ${blog.title}`, 10, 'green'))
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove Blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`removed blog ${blog.title}`, 10, 'green'))
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable openLabel='view' closeLabel='hide'>
        <div>
          <span id="blogUrl">{blog.url}</span>
          <br />
          <span id="blogLikes">{blog.likes}</span>
          <button onClick={() => addLike(blog)}>like</button>
          <br />
          <span id="blogAuthor">{blog.author}</span>
          <br />
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog
