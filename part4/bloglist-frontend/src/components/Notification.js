import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (successMessage) {
    return (
      <div className="error" style={{ ...notificationStyle, color: 'green' }} >
        {successMessage}
      </div>
    )
  }
  if (errorMessage) {
    return (
      <div className="error" style={{ ...notificationStyle, color: 'red' }} >
        {errorMessage}
      </div>
    )
  }
  return (
    null
  )
}

export default Notification