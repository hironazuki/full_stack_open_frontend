import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  const blog = {
    title: "test title",
    author: "test user",
    url: "test@example.com",
    like: 2
  }
  const updateBlog = jest.fn()
  
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={updateBlog} />
    )
  })

  test('renders its children', () => {
    expect(component.container).toHaveTextContent('test title')
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.getByText('hide')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('click likes two times', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})