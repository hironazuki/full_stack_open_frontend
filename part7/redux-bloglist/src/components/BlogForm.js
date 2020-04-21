import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)
  const blogFormRef = React.createRef()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(newBlog))
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
      dispatch(setNotification(`a new blog ${newBlog.title} by ${loginUser.name} added`, 10, 'green'))
    } catch (exception) {
      dispatch(setNotification('Wrong create blog', 10, 'red'))
    }
  }

  return(
    <Togglable openLabel='create new' closeLabel='cancel' ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            name="Title"
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            name="Author"
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            name="Url"
          />
        </div>
        <button id="blog-create-button" type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm
