import React from 'react'

const Filter = ({handleSearchCountryChange, searchCountry}) => {
  return (
    <>
      filter shown with <input value={searchCountry} onChange={handleSearchCountryChange} placeholder='search name' />
    </>
  )
}

export default Filter
