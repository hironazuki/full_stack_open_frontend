import React from 'react'
import BlogForm from './BlogForm'

import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const BlogItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
  <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
  </div>
  )
}

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <>
      <BlogForm />
      <div id="blogs">
        {blogs.map(blog =>
          <BlogItem key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default BlogList