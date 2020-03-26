import React from 'react'

import personsService from '../services/persons'

const Persons = ({ personsToShow, persons, setPersons}) => {
  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      

      personsService
        .deletePerson(id)
        setPersons(persons.filter(person => person.id !== id))
    }
  }
  return(
    <div>
      {personsToShow.map(person =>
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons

