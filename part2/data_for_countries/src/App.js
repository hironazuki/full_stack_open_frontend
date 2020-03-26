import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get(' https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
  }

  const countriesToShow = searchCountry === ''
    ? []
    : countries.filter(country => country.name.match(new RegExp(searchCountry, 'ig')))

  return (
    <div>
      <Filter handleSearchCountryChange={handleSearchCountryChange} searchCountry={searchCountry} />

      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App