import ShowCasePoems from './ShowCasePoems.vue'

describe('ShowCasePoems', () => {
  it('renders on main page, with poet name', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ShowCasePoems, {
      props: {
        poems: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
            poet: {
              _id: '6371ea89885e286801faccaa',
              name: 'التهامي',
            },
            reviewed: true,
          }
        ],
      }
    })
    cy.get('.poem p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري - التهامي'
    );

    cy.get('.poem').should(
      'have.attr',
      'href',
      '/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6'
    );
  })
  it('renders on poet page, without poet name', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(ShowCasePoems, {
      props: {
        poems: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
            reviewed: true,
          },
        ],
      }
    })
    cy.get('.poem p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..'
    );

    cy.get('.poem').should(
      'have.attr',
      'href',
      '/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6'
    );
  })
})