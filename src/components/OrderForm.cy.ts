import OrderForm from './OrderForm.vue'

describe('Confirming Customer order successfully', () => {
  it('Guest order', () => {
    // see: https://on.cypress.io/mounting-vue
    const onGuestOrderSpy = cy.spy().as('onGuestOrderSpy');
    cy.mount(OrderForm, {
      props: {
        products: [{
          "print": {
            "id":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "verses":[
              {"first":"فاِقضوا مآرِبكم عُجَالاً إِنَّما","sec":"أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"},
              {"first":"وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا","sec":"إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"}
            ]},
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
          },
          {
            "print":{
              "id":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "qoute":"وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
            },
            "fontType":"نسخ",
            "fontColor":"#000",
            "backgroundColor":"#fff"
          },
          {
            "print":{
              "poem":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "id":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "verses":[
                {"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}
              ]
            },
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#2c3e50"
          }
        ],
        onGuestOrder: onGuestOrderSpy
      }
    })
    cy.get('#name').type('Component testing');
    cy.get('#phone').type('01322445566');
    cy.get('#address').type('10th street nowhere');

    cy.get('button[type=submit]').click()
    cy.get('@onGuestOrderSpy').should('be.calledOnce');
    cy.get('@onGuestOrderSpy').should('have.been.calledWith',
      {
        name: 'Component testing',
        phone: '01322445566',
        address: '10th street nowhere',
        products: [{
          "print": {
            "id":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
            "verses":[
              {"first":"فاِقضوا مآرِبكم عُجَالاً إِنَّما","sec":"أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"},
              {"first":"وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا","sec":"إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"}
            ]},
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#000"
          },
          {
            "print":{
              "id":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "qoute":"وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
            },
            "fontType":"نسخ",
            "fontColor":"#000",
            "backgroundColor":"#fff"
          },
          {
            "print":{
              "poem":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "id":"e7749f21-9cf9-4981-b7a8-2ce262f159f6",
              "verses":[
                {"first":"تَجورُ بِذي اللُبانَةِ عَن هَواهُ","sec":"إِذا ما ذاقَها حَتّى يَلينا"}
              ]
            },
            "fontType":"نسخ",
            "fontColor":"#fff",
            "backgroundColor":"#2c3e50"
          }
        ]
      })
  })

  it('Partner order', () => {
    // see: https://on.cypress.io/mounting-vue
    const onPartnerOrderSpy = cy.spy().as('onPartnerOrderSpy');
    cy.mount(OrderForm, {
      props: {
        partner: {
          id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
          name: 'component testing',
          phone: '01322445566',
        },
        productGroups: [
          {
            "prints": [
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "verses": [
                  {
                    "first": "فاِقضوا مآرِبكم عُجَالاً إِنَّما",
                    "sec": "أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"
                  },
                  {
                    "first": "وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا",
                    "sec": "إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"
                  }
                ]
              },
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
              },
              {
                "poem": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "verses": [
                  {
                    "first": "تَجورُ بِذي اللُبانَةِ عَن هَواهُ",
                    "sec": "إِذا ما ذاقَها حَتّى يَلينا"
                  }
                ]
              }
            ],
            "fontType": "نسخ",
            "fontColor": "#fff",
            "backgroundColor": "#000"
          },
          {
            "prints": [
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "وإلفُ القبيحِ مَتلفةٌ للإحساسِ والعقلِ جميعا."
              },
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "إنّ حياة الأمم في ألسنتها."
              },
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "الأندلس، كلمةٌ واحدةٌ توقظ في دم كلّ عربيٍّ تاريخًا من المجد والجمال والعلم والأدب، وتوقِد فيه نيرانًا من الألم والغيظ والغضب والحسرة.."
              },
              {
                "id": "639b6109b5e253099333b13c",
                "qoute": "فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
              },
              {
                "id": "639b6051b5e253099333b130",
                "qoute": "إنَّ الجسد ليذهب إلى البِلى، وإنّ الروح لتخلد"
              }
            ],
            "fontType": "نسخ",
            "fontColor": "#000",
            "backgroundColor": "#fff"
          }
        ],
        onPartnerOrder: onPartnerOrderSpy
      }
    })

    cy.get('#address').type('10th street nowhere');
    cy.get('button[type=submit]').click()
    cy.get('@onPartnerOrderSpy').should('be.calledOnce');
    cy.get('@onPartnerOrderSpy').should('have.been.calledWith', 
      {
        partnerId: "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
        name: "component testing",
        phone: "01322445566",
        address: "10th street nowhere",
        products: [
          {
            "prints": [
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "verses": [
                  {
                    "first": "فاِقضوا مآرِبكم عُجَالاً إِنَّما",
                    "sec": "أَعمارُكُم سِفرٌ مِنَ الأَسفارِ"
                  },
                  {
                    "first": "وَتَراكَضوا خَيلَ الشَبابِ وَبادِروا",
                    "sec": "إِن تُستَرَدَّ فَإِنَّهُنَّ عَواري"
                  }
                ]
              },
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "وما يفوز القارئ حين يفوز، إلّا بما يفطن إليه ممّا يغفل عنه غيره، ويتجاوزه سواه."
              },
              {
                "poem": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "verses": [
                  {
                    "first": "تَجورُ بِذي اللُبانَةِ عَن هَواهُ",
                    "sec": "إِذا ما ذاقَها حَتّى يَلينا"
                  }
                ]
              }
            ],
            "fontType": "نسخ",
            "fontColor": "#fff",
            "backgroundColor": "#000"
          },
          {
            "prints": [
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "وإلفُ القبيحِ مَتلفةٌ للإحساسِ والعقلِ جميعا."
              },
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "إنّ حياة الأمم في ألسنتها."
              },
              {
                "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                "qoute": "الأندلس، كلمةٌ واحدةٌ توقظ في دم كلّ عربيٍّ تاريخًا من المجد والجمال والعلم والأدب، وتوقِد فيه نيرانًا من الألم والغيظ والغضب والحسرة.."
              },
              {
                "id": "639b6109b5e253099333b13c",
                "qoute": "فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
              },
              {
                "id": "639b6051b5e253099333b130",
                "qoute": "إنَّ الجسد ليذهب إلى البِلى، وإنّ الروح لتخلد"
              }
            ],
            "fontType": "نسخ",
            "fontColor": "#000",
            "backgroundColor": "#fff"
          }
        ]
      }
    )
  })
})