import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"

import { likedBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const loginUser = useSelector(state => state.login)
  const id = useParams().id
  const blog = blogs.find(n => n.id === id) 
  console.log(blog)
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

  if (!blog || !loginUser) {
    return null
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <span id="blogUrl"><a href={blog.url}>{blog.url}</a></span>
      <br />
      <span id="blogLikes">{blog.likes} likes</span>
      <button onClick={() => addLike(blog)}>like</button>
      <br />
      <span id="blogAuthor">{blog.author}</span>
      <br />
      {blog.user.id === loginUser.id &&
        <button onClick={() => removeBlog(blog)}>remove</button>
      }
      {/* <h4>comments</h4>
      <ui>
        {
          blog.comments.map(comment =>
            <li>{comment.content}</li>
          )
        }
      </ui> */}
      <Comments blog={blog} />
    </>
  )
}

export default Blog
