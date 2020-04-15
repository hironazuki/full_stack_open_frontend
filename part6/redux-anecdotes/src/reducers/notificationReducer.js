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

export const setNotification = (message, time) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'DELETE'
      })
    }, time * 1000)
  }
}

export default reducer