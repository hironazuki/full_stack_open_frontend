import React from 'react'
import { connect } from 'react-redux'
import { loggedInUser } from '../reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            name="Username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="Password"
          />
          <Button id="login-button" variant="primary" type="submit" className='mt-2'>login</Button>
        </Form.Group>
      </Form>
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