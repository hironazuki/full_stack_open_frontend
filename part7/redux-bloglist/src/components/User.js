import React from 'react'
import { useSelector } from 'react-redux'

import { Link, useParams } from "react-router-dom"

import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(n => n.id === id) 
  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map(blog => 
          <ListGroupItem key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </ListGroupItem>
        )}
      </ListGroup>
    </>
  )
}

export default User
