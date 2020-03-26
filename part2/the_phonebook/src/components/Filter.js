import React from 'react'

const Filter = ({handleSearchNameChange, searchName}) => {
  return (
    <>
      filter shown with <input value={searchName} onChange={handleSearchNameChange} placeholder='search name' />
    </>
  )
}

export default Filter
