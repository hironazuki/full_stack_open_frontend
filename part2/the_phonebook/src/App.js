import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personsService from './services/persons'


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
      <div style={{...notificationStyle, color:'green'}} >
        {successMessage}
      </div>
    )
  }
  if (errorMessage) {
    return (
      <div style={{ ...notificationStyle, color: 'red' }} >
        {errorMessage}
      </div>
    )
  }
  return (
    null
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchName, setSearchName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


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

      <Notification successMessage={successMessage} errorMessage={errorMessage} />

      <Filter handleSearchNameChange={handleSearchNameChange} searchName={searchName} />

      <h3>add a new</h3>

      <PersonForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App