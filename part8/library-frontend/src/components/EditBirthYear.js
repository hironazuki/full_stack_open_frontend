import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries'

const EditBirthYear = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    editBirthYear({ variables: { name, setBornTo: parseInt(born) } })

    setName('')
    setBorn('')
  }

  const handleChange = (name) => {
    setName(name.value)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={name.value}
            onChange={handleChange}
            options={props.authors.map(a => ({ value: a.name, label: a.name }))}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default EditBirthYear