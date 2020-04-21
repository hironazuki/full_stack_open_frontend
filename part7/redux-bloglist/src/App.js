import React, { useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { initializeLoginUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      dispatch(initializeLoginUser(loggedUserJSON))
    }
  }, [dispatch])

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null
        ? <LoginForm />
        : <BlogList />
      }
      {/* {loginForm()}
      {blogList()} */}
    </div>
  )
}

export default App