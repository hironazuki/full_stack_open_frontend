describe('Blog List', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test@example.com')
      cy.get('#blog-create-button').click()

      cy.get('#blogs').contains('test title')
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'author1', url: '1@example.com', likes: 2 })
        cy.createBlog({ title: 'second blog', author: 'author2', url: '2@example.com', likes: 1 })
      })

      it('it can be like', function () {
        cy.get('#blogs').contains('second blog').contains('view').click()
        cy.get('#blogs').contains('second blog').contains('like').click()
        cy.get('#blogs').contains('second blog').contains('#blogLikes', '2')
      })

      it('it can be delete', function () {
        cy.get('#blogs').contains('first blog').contains('view').click()
        cy.get('#blogs').contains('first blog').contains('remove').click()
        cy.get('#blogs').should('not.contain', 'first blog')
      })

      it.only('The order of the blog is likes', function() {
        cy.get('#blogs > div').eq(0).contains('first blog')
        cy.get('#blogs').contains('second blog').contains('view').click()
        cy.get('#blogs').contains('second blog').contains('like').click()
        cy.visit('http://localhost:3000')
        cy.get('#blogs').contains('second blog').contains('view').click()
        cy.get('#blogs').contains('second blog').contains('like').click()
        cy.visit('http://localhost:3000')
        cy.get('#blogs > div').eq(0).should('not.contain', 'first blog')
      })
    })

    describe('other user login', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Superuser blog', author: 'author1', url: '1@example.com' })
        const otherUser = {
          username: 'other',
          name: 'Otheruser',
          password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users', otherUser)
        cy.login({ username: 'other', password: 'password' })
      })

      it('can not delete other user blog', function () {
        cy.get('#blogs').contains('Superuser blog').contains('view').click()
        cy.get('#blogs').contains('Superuser blog').contains('remove').click()
        cy.get('#blogs').should('contain', 'Superuser blog')
      })
    })
  })
})