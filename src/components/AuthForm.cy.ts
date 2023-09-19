import AuthForm from './AuthForm.vue'
import { actions as partnerActions} from '../stores/partners';

describe('<AuthForm />', () => {
  it('Login', () => {
    // see: https://on.cypress.io/mounting-vue
    // cy.spy(partnerActions, "isPartner").as('onIsPartnerSpy');
    cy.spy(partnerActions, "login").as('onLoginSpy');

    cy.mount(AuthForm)

    // Defualt UI for Login, so no need to toggle it.
    // cy.get('#toggle').click()
    
    // form properties
    cy.get('#phone').type('01235554567');
    cy.get('#password').type('P@ssword1');

    // Submiting
    cy.get('button[type=submit]').click()
    cy.get('@onLoginSpy').should('be.calledOnce');
    cy.get('@onLoginSpy').should('have.been.calledWith', {phone: '01235554567', password: 'P@ssword1'});
  })
  it('Signup', () => {
    cy.spy(partnerActions, "signup").as('onSignupSpy');
    cy.mount(AuthForm)

    // Defualt UI for Login, so we need to toggle it.
    cy.get('#toggle').click()

    // form properties
    cy.get('#name').type('new User')
    cy.get('#phone').type('01235554567');
    cy.get('#password').type('P@ssword1');


    cy.get('button[type=submit]').click()
    cy.get('@onSignupSpy').should('be.calledOnce');
    cy.get('@onSignupSpy').should('have.been.calledWith',
      {
        name: 'new User',
        phone: '01235554567',
        password: 'P@ssword1'
      });
  })
})