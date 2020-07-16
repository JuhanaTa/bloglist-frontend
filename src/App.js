import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const [notificationMessage,  setMessage] = useState(null)
  const [notificationType, setNotType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const savedLoggedinUser = window.localStorage.getItem('blogUser')
    if(savedLoggedinUser){
      const user = JSON.parse(savedLoggedinUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()

    try{
      const loginUser = await loginService.login({ username, password })
      console.log(loginUser)

      window.localStorage.setItem('blogUser', JSON.stringify(loginUser))
      const savedLoggedinUser = window.localStorage.getItem('blogUser')
      const user = JSON.parse(savedLoggedinUser)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotType('success')
      setMessage('login success')
      setTimeout(() => {
        setNotType('')
        setMessage(null)
      }, 5000)

    }catch(exception){
      console.log(exception)
      setNotType('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setNotType('')
        setMessage(null)
      }, 5000)
      console.log(exception)
    }
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const loginForm = () => (
    <div>
      <Notification message={notificationMessage} type={notificationType}/>
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id='loginBtn'>login</button>
      </form>
    </div>
  )

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotType('success')
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotType('')
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotType('error')
        setMessage(`error: blog was not added ${error}`)
        setTimeout(() => {
          setNotType('')
          setMessage(null)
        }, 5000)
      })
  }

  const blogListing = () => {
    blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    let ident = 0
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} id={ident++} blog={blog} removeBlog={removeBlog} addLike={addLike}
          />
        )}
      </div>
    )
  }
  const removeBlog = async (id) => {
    await blogService
      .remove(id)
      .catch(error => {
        console.log(`something went wrong: ${error}`)
      })
    console.log('updating list')
    await blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
      .catch(error => {
        console.log(`something went wrong: ${error}`)
      })
  }

  const addLike = (blogObject, id) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log(`something went wrong: ${error}`)
      })
  }

  const blogFormRef = useRef()

  const createBlogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <CreateBlogForm createBlog={createBlog} />
    </Togglable>
  )

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  return (
    <div>
      {user === null ? loginForm() :
        <div id='mainDiv'>
          <h2>blogs</h2>
          <Notification message={notificationMessage} type={notificationType}/>
          <p>{user.name} logged in
            <Button handleClick={logoutHandler} text='logout'/>
          </p>
          {createBlogForm()}
          {blogListing()}
        </div>
      }
    </div>
  )
}

export default App