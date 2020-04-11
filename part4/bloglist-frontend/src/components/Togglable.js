import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.openLabel}</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>{props.closeLabel}</button>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </>
  )
})

export default Togglable