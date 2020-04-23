import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const addComment = (event) => {
    event.preventDefault()
    const newComment = {
      content: event.target.content.value,
    }
    dispatch(createComment(blog, newComment))
  }

  return (
    <>
      <h4>comments</h4>
      <form onSubmit={addComment}>
        <div>
          content:
          <input
            id='content'
            type="text"
            name="Content"
          />
        </div>
        <button id="comment-create-button" type="submit">add comment</button>
      </form>
      <ul>
        {
          blog.comments.map(comment =>
            <li key={comment.id}>{comment.content}</li>
          )
        }
      </ul>
    </>
  )
}

export default Comments
