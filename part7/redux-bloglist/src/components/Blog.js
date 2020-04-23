import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

import { likedBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'

import { Button } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const loginUser = useSelector(state => state.login)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id) 
  
  const addLike = (blog) => {
    dispatch(likedBlog(blog))
    dispatch(setNotification(`Liked the ${blog.title}`, 10, 'success'))
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove Blog ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`removed blog ${blog.title}`, 10, 'success'))
    }
  }

  if (!blog || !loginUser) {
    return null
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <span id="blogUrl"><a href={blog.url}>{blog.url}</a></span>
      <br />
      <span id="blogLikes">{blog.likes} likes</span>
      <Button onClick={() => addLike(blog)}>like</Button>
      <br />
      <span id="blogAuthor">{blog.author}</span>
      <br />
      {blog.user.id === loginUser.id &&
        <Button onClick={() => removeBlog(blog)} variant='danger'>remove</Button>
      }
      <Comments blog={blog} />
    </>
  )
}

export default Blog
