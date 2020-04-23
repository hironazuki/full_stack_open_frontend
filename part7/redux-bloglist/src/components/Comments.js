import React from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap'

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
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control
            id="content"
            type="text"
            name="Content"
          />
          <Button id="comment-create-button" variant="info" type="submit" className='mt-2'>add comment</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {
          blog.comments.map(comment =>
            <ListGroupItem key={comment.id}>{comment.content}</ListGroupItem>
          )
        }
      </ListGroup>
    </>
  )
}

export default Comments
