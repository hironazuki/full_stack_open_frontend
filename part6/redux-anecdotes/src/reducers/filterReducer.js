const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTERWORD':
      return state = action.data
    default:
      return state
  }
}

export const filterChange = (word) => {
  return {
    type: 'FILTERWORD',
    data: word
  }
}

export default reducer