import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import blogService from './services/blogs'

const Notification = ({ successMessage, errorMessage }) => {
  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (successMessage) {
    return (
      <div style={{...notificationStyle, color:'green'}} >
        {successMessage}
      </div>
    )
  }
  if (errorMessage) {
    return (
      <div style={{ ...notificationStyle, color: 'red' }} >
        {errorMessage}
      </div>
    )
  }
  return (
    null
  )
}

const App = () => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`logged in with ${user.username}`)
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    if (window.confirm(`logout ${user.name}?`)) {
      window.localStorage.removeItem('loggedBlogListUser')
      setSuccessMessage(`logged out with ${user.username}`)
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      setUser(null)
    }
  }
  const loginForm = () => (
    <>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogList = () => (
    <>
      <h2>blogs</h2>
      <h3>
        {`${user.name} logged in`}
        <button onClick={() => handleLogout()}>logout</button>
      </h3>
      <BlogForm setBlogs={setBlogs} blogs={blogs} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App