import ShowCasePoets from './ShowCasePoets.vue'

describe('<ShowCasePoets />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ShowCasePoets, {
      props: {
        poets: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            name: 'عنترة بن شداد',
            time_period: 'العصر الجاهلي',
          },
        ],
      },
    });

    cy.get('.poet>p').should('contain', 'عنترة بن شداد');
    cy.get('.poet').should('have.attr', 'href', '/poet/e7749f21-9cf9-4981-b7a8-2ce262f159f6');
  })
})