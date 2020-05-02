import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import _ from 'lodash'

const Recommend = (props) => {
  const { loading, data } = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }
  if (loading) return <div>...loading</div>
  if (!loading) {
    const genres = data.allBooks.map(b => b.genres)
    const result = _.uniqBy(genres.flat())
    return (
      <div>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {genre ?
              data.allBooks.filter(b => b.genres.some(g => g === genre)).map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ) :
              data.allBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
          </tbody>
        </table>
        {result.map((r, key) =>
          <button key={key} onClick={() => setGenre(`${r}`)}>{r}</button>
        )}
      </div>
    )
  }
}

export default Recommend