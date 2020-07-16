Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('blogUser', JSON.stringify(body))
    cy.visit('http://localhost:3001')
  })
})

Cypress.Commands.add('createBlog', ({ title, url, likes, author }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, url, likes, author },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('blogUser')).token}`
    }
  })

  cy.visit('http://localhost:3001')
})