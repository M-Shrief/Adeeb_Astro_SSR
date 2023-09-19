import PrintCustomization from './PrintCustomization.vue'

describe('<PrintCustomization />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(PrintCustomization);

    cy.get('.colors').should('contain', 'الخط:');
    cy.get('.colors').should('contain', 'الخلفية:');
    cy.get('.colors > button').should('have.length', 16);
  })
})