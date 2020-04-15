import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const changeAnecdote = action.data.updateAnecdote
      return state.map(n => n.id !== id ? n : changeAnecdote)
    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const voteAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updateAnecdote = await anecdoteService.update(anecdote.id, voteAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id, updateAnecdote }
    })
  }
}

export default reducer