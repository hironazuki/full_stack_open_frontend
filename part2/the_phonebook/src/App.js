import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personsService from './services/persons'


const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [setPersons])

  
  console.log(`those ${persons.length}`)
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const personsToShow = searchName === ''
    ? persons
    : persons.filter(person => person.name.match(new RegExp(searchName, 'ig')))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={alertMessage} />

      <Filter handleSearchNameChange={handleSearchNameChange} searchName={searchName} />

      <h3>add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons} setAlertMessage={setAlertMessage} />

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App