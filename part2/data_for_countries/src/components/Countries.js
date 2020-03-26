import React from 'react'

const Country = ({country}) => {
  console.log(country)

  return(
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capiral}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt="" width='180' height='120' />
    </div>
  )
}
const Countries = ({countriesToShow}) => {
  if (countriesToShow.length === 1 ) {
    return(
      <div>
        <Country country={countriesToShow[0]}/>
      </div>
    )
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        {
          countriesToShow.map(country =>
            <p key={country.name}>{country.name}</p>
          )
        }
      </div>
    )
  }

  return (
    <div>Too many matches, specify another filter</div>
  )
}

export default Countries

