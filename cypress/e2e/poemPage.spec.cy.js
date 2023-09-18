describe('Poem Page', () => {
    beforeEach(() => { 
        cy.visit('http://192.168.0.103:5173/')
        cy.get('#poems').within(() => {
            cy.get('.grid > [href="/poem/0343952d-58fc-4f56-b2b6-fc04731de5ce"]').click()
        })
    })

    it("", () => {})

})
  