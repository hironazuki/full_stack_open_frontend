import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)
  const blogs = useSelector(state => state.blogs)

  const handleLogout = () => {
    if (window.confirm(`logout ${loginUser.name}?`)) {
      dispatch(logoutUser())
    }
  }

  return(
    <>
      <h3>
        {`${loginUser.name} logged in`}
        <button onClick={() => handleLogout()}>logout</button>
      </h3>
      <BlogForm />
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default BlogList