import React, { useEffect } from 'react'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import { initializeLoginUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Redirect,
  // useParams,
  // useHistory,
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
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
        <LoginForm />
        <Router>
          <Switch>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              {loginUser && <BlogList />}
            </Route>
          </Switch>
        </Router>
      </div>
  )
}

export default App