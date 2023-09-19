import {computed} from 'vue';
import { partner,  actions as partnerActions } from '../stores/partners';
import NavbarRoutes from './NavbarRoutes.vue';

describe('Navbar links', () => {
  it('renders alright and reference right page when partner = null', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(NavbarRoutes, {
      props: {
        activeUrl: '/ordering',
      },
    });

    cy.get('a[href="/ordering"]').should('exist').should('have.class', 'active');
    cy.get('a[href="/history"]').should('exist');
    cy.get('a[href="/about"]').should('exist');
    cy.get('a[href="/partners/auth"]').should('exist');
    cy.get('span.nav-item').should('not.exist');
  });

  // Still need to know how to deal with injectables
  it('renders alright and reference right page when partner is logged in, and the partner is able to logout.', () => {
    cy.spy(partnerActions, "logout").as('onLogoutSpy');

    partner.value =  JSON.stringify({
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      name: 'Quasar SSR',
      phone: '01023669999',
    });

    cy.mount(NavbarRoutes, {
      props: {
        activeUrl: '/',
      },
    });

    cy.get('a[href*="/partners/ordering"]').should('exist');
    cy.get('a[href*="/partners/history"]').should('exist');
    cy.get('a[href*="/about"]').should('exist');

    cy.get('.partner-name').should('contain', 'Quasar SSR');

    cy.get('span.nav-item').should('contain', 'تسجيل الخروج').click();
    cy.get('@onLogoutSpy').should('be.calledOnce')
  });

});
