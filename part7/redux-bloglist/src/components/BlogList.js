import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <>
      <BlogForm />
      <div id="blogs">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )
}

export default BlogList