import React from 'react'
import { connect } from 'react-redux'
import { loggedInUser, logoutUser } from '../reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm =(props) => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.login)

  const handleLogin = (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    try {
      dispatch(loggedInUser(user))
      event.target.username.value = ''
      event.target.password.value = ''
      dispatch(setNotification(`logged in with ${user.username}`, 10, 'green'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 10, 'red'))
    }
  }

  const handleLogout = () => {
    if (window.confirm(`logout ${loginUser.name}?`)) {
      dispatch(logoutUser())
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const logoutForm = () => (
    <h3>
      {`${loginUser.name} logged in`}
      <button onClick={() => handleLogout()}>logout</button>
    </h3>
  )

  return (
    <>
      {loginUser === null
        ? loginForm()
        : logoutForm()
      }
    </>
  )
}

const mapDispatchToProps = {
  loggedInUser,
  setNotification
}

const connectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default connectedLoginForm