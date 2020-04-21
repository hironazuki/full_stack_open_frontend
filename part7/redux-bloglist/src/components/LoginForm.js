import React from 'react'
import { connect } from 'react-redux'
import { loggedInUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm =(props) => {
  const loginUser = (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    try {
      props.loggedInUser(user)
      event.target.username.value = ''
      event.target.password.value = ''
      props.setNotification(`logged in with ${user.username}`, 10, 'green')
    } catch (exception) {
      props.setNotification('Wrong username or password', 10, 'red')
    }
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginUser}>
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