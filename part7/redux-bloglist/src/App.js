import React, { useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import { initializeLoginUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from './reducers/loginReducer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // Redirect,
  // useParams,
  // useHistory,
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      dispatch(initializeLoginUser(loggedUserJSON))
    }
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(initializeUsers())
  // }, [dispatch])

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
  //   if (loggedUserJSON) {
  //     dispatch(initializeLoginUser(loggedUserJSON))
  //   }
  // }, [dispatch])

  const handleLogout = () => {
    if (window.confirm(`logout ${loginUser.name}?`)) {
      dispatch(logoutUser())
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {loginUser
          ? <>
              <em>{loginUser.username} logged in</em>
              <button onClick={() => handleLogout()}>logout</button>
            </>
          : <Link style={padding} to="/">login</Link>
        }
      </div>
      <Notification />
      <h2>blog app</h2>
      <LoginForm />
      <Switch>
        <Route path='/blogs/:id'>
          {loginUser && <Blog />}
        </Route>
        <Route path='/users/:id'>
          {loginUser && <User />}
        </Route>
        <Route path='/users'>
          {loginUser && <Users />}
        </Route>
        <Route path='/'>
          {loginUser && <BlogList />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App