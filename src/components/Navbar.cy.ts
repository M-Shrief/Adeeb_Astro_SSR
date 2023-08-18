import {computed} from 'vue';
import Navbar from './Navbar.vue';

describe('Navbar links', () => {
  it('renders alright and reference right page when partner = null', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Navbar, {
      props: {
        getPartner: null,
      },
    });

    cy.get('#logo').should('have.attr', 'href', '/');
    cy.get('a[href="/ordering"]').should('exist');
    cy.get('a[href="/history"]').should('exist');
    cy.get('a[href="/about"]').should('exist');
    cy.get('a[href="/partners/auth"]').should('exist');
    cy.get('span.nav-item').should('not.exist');
  });

  // Still need to know how to deal with injectables
  it('renders alright and reference right page when partner is logged in', () => {
    const getPartner = computed(() => {
      return {
        id: '6472fcb22451bac176fa5475',
        name: 'Quasar SSR',
        phone: '01023669999',
        address: '10th street, Cairo',
      };
    })
    cy.mount(Navbar, {
      props: {
        getPartner
      },
    });

    cy.get('#logo').should('have.attr', 'href', '/');
    cy.get('a[href*="/partners/ordering"]').should('exist');
    cy.get('a[href*="/partners/history"]').should('exist');
    cy.get('a[href*="/about"]').should('exist');

    cy.get('.partner-name').should('contain', 'Quasar SSR');
    cy.get('span.nav-item').should('contain', 'تسجيل الخروج');
  });
});
