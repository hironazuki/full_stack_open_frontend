import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

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
      <Button style={hideWhenVisible} onClick={toggleVisibility} className='mb-2'>{props.openLabel}</Button>
      <Button style={showWhenVisible} onClick={toggleVisibility} className="togglableContent" variant={'secondary'}>{props.closeLabel}</Button>
      <div style={showWhenVisible} className="togglableContent">
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