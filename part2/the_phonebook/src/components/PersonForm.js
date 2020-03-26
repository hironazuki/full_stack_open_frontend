import React, { useState } from 'react'

import personsService from '../services/persons'

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const validateName = persons.some(person => person.name === newName)
    
    if (validateName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatePerson = persons.find(n => n.name === newName)
        personsService
          .update(updatePerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatePerson.id ? person : returnedPerson))
          })
          .catch((error) => {
            alert(
              `the person '${updatePerson.name}' was already deleted from server`
            )
            console.log(error)
            setPersons(persons.filter(n => n.id !== updatePerson.id))
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} placeholder='a new person.' />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} placeholder='a new number.' />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
