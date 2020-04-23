import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'

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
    try {
      dispatch(createBlog(newBlog))
      blogFormRef.current.toggleVisibility()
      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
      dispatch(setNotification(`a new blog ${newBlog.title} by ${loginUser.name} added`, 10, 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong create blog', 10, 'danger'))
    }
  }
  return(
    <Togglable openLabel='create new' closeLabel='cancel' ref={blogFormRef}>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="Title"
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="Author"
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            name="Url"
          />
        <Button id="blog-create-button" variant="primary" type="submit" className='mt-2'>create</Button>
        </Form.Group>
      </Form>
    </Togglable>
  )
}

export default BlogForm
