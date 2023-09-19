import SelectedPrints from './SelectedPrints.vue'
import {actions as printsActions, prints} from '../stores/prints';
import {partner} from '../stores/partners';

describe('<SelectedPrints />', () => {
  it('show a sample of print.verses, with the ability to remove them by dblClick .prints-item, title link to /ordering when isPartner = false.', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.spy(printsActions, "remove").as('onRemovePrintSpy');
    prints.value = [
      {
        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        verses: [
          {
            first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
            sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
          },
          {
            first: 'بَينا يَرى الإِنسان فيها مُخبِراً',
            sec: 'حَتّى يُرى خَبَراً مِنَ الأَخبارِ',
          },
        ],
      }
    ]
    cy.mount(SelectedPrints);

    cy.get('.prints-item>p').should(
      'contain',
      'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..'
    );

    cy.get('.prints-item').dblclick()

    cy.get('@onRemovePrintSpy').should('be.calledOnce');

    cy.get('.title').should('have.attr', 'href', '/ordering');
  });

  it('show a sample of print.verses, with the ability to remove them by dblClick .prints-item, title link to /partners/ordering when isPartner = true', () => {
    cy.spy(printsActions, "remove").as('onRemovePrintSpy');

    partner.value =  JSON.stringify({
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      name: 'Quasar SSR',
      phone: '01023669999',
    });

    prints.value = [
      {
        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
        qoute:
          'لا حياة لأمة بغير لسان، واللسان كالنهر الجارف، يجمع كل محصول الأمة، كالغيث منهمر، آلاف القرون يتكون منه هذا النهر، فإذا انقطع تيار هذا النهر فقد وقعت في خيبة.',
      }
    ]

    // see: https://on.cypress.io/mounting-vue
    cy.mount(SelectedPrints);

    cy.get('.prints-item>p').should('contain', 'لا حياة لأمة بغ..');

    cy.get('.prints-item').dblclick()

    cy.get('@onRemovePrintSpy').should('be.calledOnce');

    cy.get('.title').should('have.attr', 'href', '/partners/ordering');
  });
})