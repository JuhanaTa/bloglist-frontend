import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog/> render tests', () => {
  const blog = {
    title: 'testing title',
    author: 'tester',
    url: 'test@test.com',
    likes: 12
  }

  test('renders default content', () => {

    const component = render(
      <Blog key={blog.id} blog={blog}/>
    )
    component.debug()
    expect(component.container).toHaveTextContent(
      'testing title',
    )
    expect(component.container).not.toHaveTextContent(
      'test@test.com',
      12
    )
  })

  test('renders right content after button pressed', () => {
    const component = render(
      <Blog key={blog.id} blog={blog}/>
    )
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    component.debug()

    expect(component.container).toHaveTextContent(
      'testing title', 'tester', 'test@test.com', 12
    )
  })

  test('event handler called twice', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog key={blog.id} blog={blog} addLike={mockHandler} />
    )
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
