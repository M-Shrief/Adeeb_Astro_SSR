import ShowCasePoetry from './ShowCasePoetry.vue'
import {actions as printsActions} from '../stores/prints';

describe('<ShowCasePoetry />', () => {
  it('Renders a ChosenVerse with one Verse', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.spy(printsActions, "add").as('onAddPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            poet: {
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              name: 'التهامي',
            },
            poem: {id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6'},
            reviewed: true,
            tags: 'الحكمة',
            verses: [
              {
                first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
              },
            ],
          },
        ],
        routeName: 'main',
      },
    });

    cy.get('.one-verse>.first').should(
      'contain',
      'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً'
    );
    cy.get('.one-verse>.sec').should(
      'contain',
      'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ'
    );

    cy.get('.details').should('contain', 'التهامي - القصيدة الكاملة');
    cy.get('.details').should('have.attr', 'href','/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6');

    cy.get('.print-button:first').click();
    cy.get('@onAddPrintSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses: [
        {
          first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
          sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
        },
      ],
    });
  });

  it('Renders a ChosenVerse on Poet page with two Verse', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.spy(printsActions, "add").as('onAddPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            poet: {
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              name: 'التهامي',
            },
            poem: {id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6'},
            reviewed: true,
            tags: 'الحكمة',
            verses: [
              {
                first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
              },
              {
                first: 'ما زادَ فَوق الزادِ خُلِّف ضائِعاً',
                sec: 'في حادِثٍ أَو وارِث أَو عاري',
              },
            ],
          },
        ],
        routeName: 'poet',
      },
    });

    cy.get('.two-verse>.first').should(
      'contain',
      'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً'
    );
    cy.get('.two-verse>.sec').should(
      'contain',
      'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ'
    );

    cy.get('.details').should('contain', 'القصيدة الكاملة');
    cy.get('.details').should('have.attr', 'href','/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6');

    cy.get('.print-button').click();
    cy.get('@onAddPrintSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses: [
        {
          first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
          sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
        },
        {
          first: 'ما زادَ فَوق الزادِ خُلِّف ضائِعاً',
          sec: 'في حادِثٍ أَو وارِث أَو عاري',
        },
      ],
    });
  });

  it('Renders a Prose on Main page', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.spy(printsActions, "add").as('onAddPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            poet: {
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              name: 'محمود شاكر (أبو فهر)',
            },
            tags: 'حكمة, ثورة, فوقة',
            qoute:
              'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
            reviewed: true,
          },
        ],
        routeName: 'main',
      },
    });
    cy.get('.prose-item>.qoute').should(
      'contain',
      'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.'
    );
    cy.get('.details').should('contain', 'محمود شاكر (أبو فهر)');
    cy.get('.details').should(
      'have.attr',
      'href',
      '/poet/e7749f21-9cf9-4981-b7a8-2ce262f159f6'
    );

    cy.get('.print-button').click();
    cy.get('@onAddPrintSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      qoute:
        'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
    });
  });

  it(' a Prose on Poet page', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.spy(printsActions, "add").as('onAddPrintSpy');
    cy.mount(ShowCasePoetry, {
      props: {
        poetry: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            poet: {
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              name: 'محمود شاكر (أبو فهر)',
            },
            tags: 'حكمة, ثورة, فوقة',
            qoute:
              'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
            reviewed: true,
          },
        ],
        routeName: 'poet',
      },
    });
    cy.get('.prose-item>.qoute').should(
      'contain',
      'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.'
    );

    cy.get('.print-button').click();
    cy.get('@onAddPrintSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      qoute:
        'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
    });
  });
})