import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

import { ALL_BOOKS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [favGenreBooks, setfavGenreBooks] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(JSON.parse(token))
    }
  }, [])

  useEffect(() => {
    if (result.data) {
      setfavGenreBooks(result.data.allBooks)
    }
  }, [result.data])
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const whenLogout = () => (
    <button onClick={() => setPage('login')}>login</button>
  )

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const showFavGenreBooks = (name) => {
    setPage('recommend')
    console.log(typeof token.user.favoriteGenre)
    getBooks({ variables: { genre: token.user.favoriteGenre } })
  }

  const whenLogin = () => (
    <>
      <button onClick={() => setPage('add')}>add book</button>
      <button onClick={showFavGenreBooks}>recommend</button>
      <button onClick={logout}>logout</button>
    </>
  )

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (whenLogin()) : whenLogout()}
      </div>

      <Notify errorMessage={errorMessage} />
      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Authors
        // authors={result.data.allAuthors}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommend
        show={page === 'recommend'}
        favGenreBooks={favGenreBooks}
        token={token}
      />
    </div>
  )
}

export default App