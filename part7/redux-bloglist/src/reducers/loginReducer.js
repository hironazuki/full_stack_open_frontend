import loginService from '../services/login'
import blogService from '../services/blogs'

import { setNotification } from '../reducers/notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return state = action.data
  case 'LOGOUT_USER':
    return state = null
  default: {
    return state
  }
  }
}

export const initializeLoginUser = (loggedUserJSON) => {
  return async dispatch => {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN_USER',
      data: user,
    })
  }
}

export const loggedInUser = (user) => {
  return async dispatch => {
    try {
      const loginUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      dispatch({
        type: 'LOGIN_USER',
        data: loginUser,
      })
      dispatch(setNotification(`logged in with ${user.username}`, 10, 'green'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 10, 'red'))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogListUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default loginReducer