import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handletitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleauthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleurlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog= (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={handletitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={handleauthorChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={handleurlChange}
          />
        </div>
        <button type="submit" id='createBlogBtn'>create</button>
      </form></div>

  )
}
CreateBlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired }


export default CreateBlogForm