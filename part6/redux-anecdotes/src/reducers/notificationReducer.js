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

export const setNotification = (message) => {
  return {
    type: 'SET',
    data: message
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE'
  }
}

export default reducer