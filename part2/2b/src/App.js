import React, { useState } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [searchName, setSearchName] = useState('')

  const addPerson = (event) => {
    const validateName = persons.some(person => person.name === newName)
    console.log(validateName)
    event.preventDefault()
    if (validateName) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.match(new RegExp(searchName, 'ig')))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearchNameChange={handleSearchNameChange} searchName={searchName} />

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} />

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App