import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification) {
    return (
      <div className="error" style={{ ...notificationStyle, color: `${notification.type}` }} >
        {notification.message}
      </div>
    )
  }
  return (
    null
  )
}

export default Notification