import ShowCasePrints from './ShowCasePrints.vue'

describe('Show case Print', () => {
  it('Renders text prints properly', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    const onRemoveSpy = cy.spy().as('onRemoveSpy');
    cy.mount(ShowCasePrints, {
      props: {
        prints: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            verses: [
              {
                first: 'نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى',
                sec: 'ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ',
              },
              {
                first: 'لا أرى إلا فَنَاءً أو سُدًى',
                sec: 'فَبَصِيرٌ في ضَلالٍ أو عَمِ',
              },
            ],
          },
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            qoute:
              'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
          },
        ],
        onPrint: onPrintSpy,
        onRemove: onRemoveSpy,
      },
    });

    cy.get('.print-item .verse>p').should(
      'contain',
      'نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى'
    );
    cy.get('.print-item .verse>p').should(
      'contain',
      'ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ'
    );
    cy.get('.print-item .qoute>p').should(
      'contain',
      'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.'
    );
  });
  it('It emit print with proper values', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    const onRemoveSpy = cy.spy().as('onRemoveSpy');
    cy.mount(ShowCasePrints, {
      props: {
        prints: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            verses: [
              {
                first: 'نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى',
                sec: 'ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ',
              },
              {
                first: 'لا أرى إلا فَنَاءً أو سُدًى',
                sec: 'فَبَصِيرٌ في ضَلالٍ أو عَمِ',
              },
            ],
          },
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            qoute:
              'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
          },
        ],
        onPrint: onPrintSpy,
        onRemove: onRemoveSpy,
      },
    });

    cy.get('.print-item>div').click({ multiple: true });
    cy.get('@onPrintSpy').should('be.calledTwice');
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses: [
        {
          first: 'نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى',
          sec: 'ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ',
        },
        {
          first: 'لا أرى إلا فَنَاءً أو سُدًى',
          sec: 'فَبَصِيرٌ في ضَلالٍ أو عَمِ',
        },
      ],
    });
    cy.get('@onPrintSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      qoute:
        'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
    });
  });
  it('It emit remove with proper values', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPrintSpy = cy.spy().as('onPrintSpy');
    const onRemoveSpy = cy.spy().as('onRemoveSpy');
    cy.mount(ShowCasePrints, {
      props: {
        prints: [
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            verses: [
              {
                first: 'نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى',
                sec: 'ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ',
              },
              {
                first: 'لا أرى إلا فَنَاءً أو سُدًى',
                sec: 'فَبَصِيرٌ في ضَلالٍ أو عَمِ',
              },
            ],
          },
          {
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            qoute:
              'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
          },
        ],
        onPrint: onPrintSpy,
        onRemove: onRemoveSpy,
      },
    });

    cy.get('.print-item>button').click({ multiple: true });
    cy.get('@onRemoveSpy').should('be.calledTwice');
    cy.get('@onRemoveSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      verses: [
        {
          first: 'نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى',
          sec: 'ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ',
        },
        {
          first: 'لا أرى إلا فَنَاءً أو سُدًى',
          sec: 'فَبَصِيرٌ في ضَلالٍ أو عَمِ',
        },
      ],
    });
    cy.get('@onRemoveSpy').should('have.been.calledWith', {
      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
      qoute:
        'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
    });
  });
});