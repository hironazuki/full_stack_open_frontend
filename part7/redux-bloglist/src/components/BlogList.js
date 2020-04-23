import React from 'react'
import BlogForm from './BlogForm'

import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <>
      <BlogForm />
      <Table striped>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList