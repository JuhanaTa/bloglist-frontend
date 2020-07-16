import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm/> tests', () => {
  const blogObject = {
    title: 'test',
    author: 'tester',
    url: 'test@test.com'
  }

  test('', () => {
    const mockHandler = jest.fn()
    const component = render(
      <CreateBlogForm  createBlog={mockHandler}/>
    )


    component.handleinputCh



    const createBlogButton = component.getByText('create')
    fireEvent.click(createBlogButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler).toHaveBeenCalledWith(blogObject)
  })
})