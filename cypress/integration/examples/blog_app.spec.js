describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Juhana',
      username: 'juhq',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
      cy.get('#username').type('juhq')
      cy.get('#password').type('salainen')
      cy.get('#loginBtn').click()

      cy.contains('blogs')
      cy.contains('Juhana logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login')
      cy.get('#username').type('juhq')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginBtn').click()

      cy.get('.error').should('contain','wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'juhq', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
      cy.get('#revealBtn').click()

      cy.get('#title').type('blog made by cypress')
      cy.get('#author').type('Juhana')
      cy.get('#url').type('blog@blog.com')
      cy.get('#createBlogBtn').click()

      cy.contains('blog made by cypress')
    })

    describe('blog can be created and liked', function(){
      beforeEach(function(){
        cy.createBlog({ title: 'made by cypress', url: 'blog@blog.com', likes: 0, author: 'Juhana' })
      })

      it('A blog can be liked', function(){
        cy.get('#viewBtn').click()
        cy.contains('blog@blog.com')
        cy.contains('Juhana')
        cy.contains('0')
        cy.get('#likeBtn').click()
        cy.contains('1')
      })

      it('blog can be deleted', function(){
        cy.get('#viewBtn').click()
        cy.get('#removeBtn').click()
        cy.get('#mainDiv')
          .should('not.contain', 'made by cypress')
      })
    })

    describe('', function(){
      beforeEach(function(){
        cy.createBlog({ title: 'made by cypress', url: 'blog@blog.com', likes: 5, author: 'Juhana' })
        cy.createBlog({ title: 'made by cypress', url: 'blog@blog.com', likes: 10, author: 'Juhana' })
        cy.createBlog({ title: 'made by cypress', url: 'blog@blog.com', likes: 7, author: 'Juhana' })
      })

      it('likes are in rigth order', function(){
        cy.get('#viewBtn').click()
        cy.get('#viewBtn').click()
        cy.get('#viewBtn').click()

        //divs which contains like amounts are named expanded0, expanded 1 and so on
        //then we just check that those divs have rigth numbers
        cy.get('#expanded0').should('contain', '10')
        cy.get('#expanded1').should('contain', '7')
        cy.get('#expanded2').should('contain', '5')

      })

    })


  })
})
