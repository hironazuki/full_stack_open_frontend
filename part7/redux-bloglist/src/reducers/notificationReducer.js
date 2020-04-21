const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET':
    return state = action.data
  case 'DELETE':
    return state = null
  default:
    return state
  }
}

let timeoutId

export const setNotification = (message, time, type) => {
  return async (dispatch) => {
    clearTimeout(timeoutId)
    await dispatch({
      type: 'SET',
      data: { message, type }
    })
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE'
      })
    }, time * 1000)
  }
}

export default reducer