import React from 'react'

const Recommend = ({ favGenreBooks, show, token }) => {

  if (!show) {
    return null
  }

  if (!favGenreBooks) return <div>...loading</div>

  if (favGenreBooks) {
    return (
      <div>
        <h2>recommendations</h2>
        <p>{`books in your favorite genre ${token.user.favoriteGenre}`}</p>
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
            {
              favGenreBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Recommend