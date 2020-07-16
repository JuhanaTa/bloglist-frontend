import React from 'react'

const makeNotification = ({ message, type }) => {
  if(message === null){
    return null
  }
  if(type === 'error'){
    return(
      <div className="error">
        {message}
      </div>
    )
  }
  else if(type === 'success'){
    return(
      <div className="success">
        {message}
      </div>
    )
  }
  else{
    return null
  }
}


export default makeNotification