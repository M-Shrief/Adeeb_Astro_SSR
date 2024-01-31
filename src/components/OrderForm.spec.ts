import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Componetns
import OrderForm from './OrderForm.vue';
import type { Partner } from '../stores/__types__';

describe('Confirming Customer order successfully', () => {
    it('Guest order', async () => {
        const wrapper = mount(OrderForm, {
            props: {
                products: [
                    {
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
                currentLocale: "ar"
            }
        });
        await wrapper.find('#name').setValue('Component testing');
        await wrapper.find('#phone').setValue('01322445566');
        await wrapper.find('#address').setValue('10th street nowhere');
        await wrapper.find('button[type=submit]').trigger('submit');

        await flushPromises();

        await waitForExpect(() => {
            const onGuestOrder = wrapper.emitted('guestOrder');
            expect(onGuestOrder).toBeTruthy()
            expect(onGuestOrder![0][0]).toEqual({
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
    })
    it('Partner order', async () => {
        const wrapper = mount(OrderForm, {
            props: {
                partner: {
                  id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
                  name: 'component testing',
                  phone: '01322445566',
                } as Partner,
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
                        "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                        "qoute": "فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                      },
                      {
                        "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                        "qoute": "إنَّ الجسد ليذهب إلى البِلى، وإنّ الروح لتخلد"
                      }
                    ],
                    "fontType": "نسخ",
                    "fontColor": "#000",
                    "backgroundColor": "#fff"
                  }
                ],
                currentLocale: "ar"

            }
        })

        await wrapper.find('#address').setValue('10th street nowhere');
        await wrapper.find('button[type=submit]').trigger('submit');
        await flushPromises();

        await waitForExpect(() => {
            const onPartnerOrder = wrapper.emitted('partnerOrder');
            const onGuestOrder = wrapper.emitted('guestOrder');
            expect(onGuestOrder).toBeFalsy();
            expect(onPartnerOrder).toBeTruthy();
            expect(onPartnerOrder![0][0]).toEqual({
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
                          "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                          "qoute": "فأيّما شاعرٍ أو أديبٍ قال، فإنّما بقلبه وجب أن يقول، ومن داخله كُتب عليه أن يتكلّم."
                        },
                        {
                          "id": "e7749f21-9cf9-4981-b7a8-2ce262f159f6",
                          "qoute": "إنَّ الجسد ليذهب إلى البِلى، وإنّ الروح لتخلد"
                        }
                      ],
                      "fontType": "نسخ",
                      "fontColor": "#000",
                      "backgroundColor": "#fff"
                    }
                  ]
            })
        })
    })
})