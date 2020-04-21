import React from 'react'
import { connect } from 'react-redux'
import { loggedInUser } from '../reducers/loginReducer'
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
    dispatch(loggedInUser(user))
  }
  if (loginUser) {
    return null
  }

  return (
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