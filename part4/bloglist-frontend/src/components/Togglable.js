import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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

Togglable.propTypes = {
  openLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable