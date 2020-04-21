import blogService from '../services/blogs'
import { initializeUsers } from '../reducers/userReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKED_BLOG': {
    const id = action.data.id
    const changeBlog = action.data.updateBlog
    return state.map(n => n.id !== id ? n : changeBlog)
  }
  case 'DELETE_BLOG': {
    const deleteId = action.data
    return state.filter(blog => blog.id !== deleteId)
  }
  default: {
    return state
  }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.createNew(blog)
    dispatch(initializeUsers())
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likedBlog = (blog) => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updateBlog = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'LIKED_BLOG',
      data: { id: blog.id, updateBlog }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(initializeUsers())
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default blogReducer