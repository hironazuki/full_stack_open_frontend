import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogService from './services/blogs'



const App = () => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`a new blog ${newBlog.title} by ${user.name} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage('wrong blogs parameter')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogId) => {
    const blog = blogs.find(n => n.id === blogId.toString())
    try {
      const changeBlog = { ...blog, likes: blog.likes + 1 }
      const updateBlog = await blogService.update(blogId, changeBlog)
      setBlogs(blogs.map(blog => blog.id !== blogId ? blog : updateBlog))
      setSuccessMessage(`blog ${blog.title} add likes by ${user.username}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(`Blog '${blog.title}' was already deleted from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(n => n.id !== blogId))
    }
  }

  const deleteBlog = async (blogId) => {
    const blog = blogs.find(n => n.id === blogId.toString())
    if (window.confirm(`Remove Blog ${blog.title}`)) {
      try {
        await blogService.deleteBlog(blogId)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        setSuccessMessage(`removed blog ${blog.title}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch(exception) {
        setErrorMessage('missing remove blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== blogId))
      }
    }
  }

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
        setSuccessMessage(null)
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
        setSuccessMessage(null)
      }, 5000)
      setUser(null)
    }
  }
  const loginForm = () => (
    <Togglable openLabel='login' closeLabel='cancel'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable openLabel='new note' closeLabel='cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )
  const blogList = () => (
    <>
      <h2>blogs</h2>
      <h3>
        {`${user.name} logged in`}
        <button onClick={() => handleLogout()}>logout</button>
      </h3>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
      )}
    </>
  )
  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App