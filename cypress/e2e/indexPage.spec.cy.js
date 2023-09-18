describe('Index Page', () => {
  beforeEach(() => { cy.visit('http://192.168.0.103:5173/')})
  it('visits the index page with correct Navbar & ThemeSwitch.' , () => {

    cy.get('[href="/"]').should('exist')
    cy.get('[href="/ordering"]').should('exist')
    cy.get('[href="/history"]').should('exist')
    cy.get('[href="/about"]').should('exist')
    cy.get('[href="/partners/auth"]').should('exist')

    cy.get('html').should('have.attr', 'color-scheme', 'light')
    cy.get('#theme-toggle').click()
    cy.get('html').should('have.attr', 'color-scheme', 'dark')
  })

  it('poems section renders multiple poem details(intro - poet) & link(/poem/:id) ', () => {
    cy.get('#poems').within(() => {
      cy.get('[href^="/poem/"]', {multiple: true}).should('have.class', 'poem');
      cy.get('p').should('contain.text', 'عنترة بن شداد');
      cy.get('p').should('contain.text', 'السَيفُ أَصدَقُ أَنباءً مِنَ الكُتُبِ');
    })
  })

  it('poets section renders multiple poet name with link(/poet/:id) ', () => {
    cy.get('#poets').within(() => {
      cy.get('[href^="/poet/"]', {multiple: true}).should('have.class', 'poet');
      cy.get('p').should('contain.text', 'عنترة بن شداد');
      cy.get('p').should('contain.text', 'محمود شاكر');
    })
  })

  it('poetry section renders multiple poetry items, with addPrint button', () => {
    cy.get('#poetry').within(() => {
      
      cy.get('.chosenverse-item', {multiple: true});
      cy.get('.chosenverse-item>.one-verse', {multiple: true})
      cy.get('.chosenverse-item>.two-verse', {multiple: true})
      cy.get('.chosenverse-item>.details', {multiple: true}).should('contain.text', ' - القصيدة الكاملة')
      cy.get('.chosenverse-item>.print-button', {multiple: false})
      
      cy.get('.prose-item', {multiple: true});
      cy.get('.prose-item>.qoute', {multiple: true})
      cy.get('.prose-item>.details', {multiple: true})


    })
  })
})
