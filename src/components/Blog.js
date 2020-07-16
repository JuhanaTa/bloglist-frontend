import React, { useState } from 'react'

const Blog = ({ id, blog, removeBlog, addLike }) => {
  console.log('blog id' + id)
  const [showAll, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    if(showAll === true){
      setShow(false)
    }
    else
      setShow(true)
  }

  const likeAddition = (event) => {
    event.preventDefault()
    const blogWithLike = {
      url: blog.url,
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author
    }
    addLike(blogWithLike, blog.id)
  }

  const blogDeletion = (event) => {
    event.preventDefault()
    const result = window.confirm(`Do you want to remove blog: ${blog.title}`)
    if(result){
      removeBlog(blog.id)
    }
  }

  const expandedBlogForm = () => {
    let expanded = `expanded${id}`
    return(
      <div id={expanded}>
        <p>{blog.title}<button onClick={toggleVisibility} id='hideBtn'>hide</button><br></br>
          {blog.url}<br></br>
          {blog.likes}<button onClick={likeAddition} id='likeBtn'>like</button><br></br>
          {blog.author}</p>
        <button onClick={blogDeletion} id='removeBtn'>remove</button>
      </div>
    )
  }

  const smallBlogForm = () => (
    <div id='small'>{blog.title}
      <button onClick={toggleVisibility} id='viewBtn'>view</button>
    </div>
  )

  return (

    <div id='smallOrExpanded' style={blogStyle}>
      {showAll === false ?
        smallBlogForm() : expandedBlogForm()
      }

    </div>
  )}

export default Blog
