import ShowCasePoem from './ShowCasePoem.vue';
import {actions as printsActions} from '../stores/prints';

describe('Renders poem properly', () => {
  it('it render the verse properly and emit an event for print the verse when clicked', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.spy(printsActions, "add").as('onAddPrintSpy');

    cy.mount(ShowCasePoem, {
      props: {
        verses: [
          {
            first: 'وَجَدتُ وَعدَكَ زوراً في مُزَوَّرَةٍ',
            sec: 'وَصَفتَ مُبتَدِئً بِالحِذقِ طاهيها',
          },
        ],
      },
    });

    
    cy.get('.verse>.first').should(
      'contain',
      'وَجَدتُ وَعدَكَ زوراً في مُزَوَّرَةٍ'
    );
    cy.get('.verse>.sec').should(
      'contain',
      'وَصَفتَ مُبتَدِئً بِالحِذقِ طاهيها'
    );

    cy.get('.verse').dblclick();
    cy.get('@onAddPrintSpy').should('be.calledOnce');
    cy.get('@onAddPrintSpy').should('have.been.calledWith', {
        "id": "0",
        "verses": [
          {
            "first": "وَجَدتُ وَعدَكَ زوراً في مُزَوَّرَةٍ",
            "sec": "وَصَفتَ مُبتَدِئً بِالحِذقِ طاهيها"
          }
        ]
      });
    
  });
});
