import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Componetns
import ShowCasePoetry from './ShowCasePoetry.vue';
// Stores
import {actions as printsActions} from '../stores/prints';
// Types
import  type { ChosenVerse, Poetry} from '../stores/__types__'

describe.concurrent('<ShowCasePoetry />', () => {
    it('Renders a ChosenVerse with one Verse', async () => {
        const wrapper = mount(ShowCasePoetry, {
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
                ] as Poetry[],
                routeName: 'main',
            },
        })


        expect(wrapper.find('.one-verse>.first').text()).equal('نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً');
        expect(wrapper.find('.one-verse>.sec').text()).equal('وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ');
        expect(wrapper.find('.details').text()).equal('التهامي - القصيدة الكاملة');
        expect(wrapper.find('.details').attributes()).toHaveProperty('href', '/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6');

        const printSpy = vi.spyOn(printsActions, 'add')
        wrapper.find('.print-button').trigger('click');

        expect(printSpy).toHaveBeenCalled()
        expect(printSpy).toHaveBeenCalledWith({
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            verses: [
              {
                first: 'نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً',
                sec: 'وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ',
              },
            ],
        })
    })
    it('Renders a ChosenVerse on Poet page with two Verse', async () => {
        const wrapper = mount(ShowCasePoetry, {
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
                ] as Poetry[],
                routeName: 'poet',
            },
        })

        expect(wrapper.find('.two-verse>.first').text()).equal('نَزدادُ هَمّاً كُلَمّا اِزدَدنا غِنَىً');
        expect(wrapper.find('.two-verse>.sec').text()).equal('وَالفَقرُ كُلَّ الفَقرِ في الإِكثارِ');
        expect(wrapper.find('.details').text()).equal('القصيدة الكاملة');
        expect(wrapper.find('.details').attributes()).toHaveProperty('href', '/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6');

        const printSpy = vi.spyOn(printsActions, 'add');
        await wrapper.find('.print-button').trigger('click');

        expect(printSpy).toHaveBeenCalled()
        expect(printSpy).toHaveBeenCalledWith({
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
          })
    
    })
    it('Renders a Prose on Main page', async () => {
        const wrapper = mount(ShowCasePoetry, {
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
                ] as Poetry[],
                routeName: 'main',
            }
        })

        expect(wrapper.find('.prose-item>.qoute').text()).equal('الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.')
        expect(wrapper.find('.details').text()).equal('محمود شاكر (أبو فهر)')
        expect(wrapper.find('.details').attributes()).toHaveProperty('href', '/poet/e7749f21-9cf9-4981-b7a8-2ce262f159f6')

        const printSpy = vi.spyOn(printsActions, 'add');
        await wrapper.find('.print-button').trigger('click');

        expect(printSpy).toHaveBeenCalled();
        expect(printSpy).toHaveBeenCalledWith({
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            qoute:  'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
        });
    })

    it('Renders a Prose on Poet page', async () => {
        const wrapper = mount(ShowCasePoetry, {
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
                ] as Poetry[],
                routeName: 'main',
            }
        })

        expect(wrapper.find('.prose-item>.qoute').text()).equal('الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.')
        expect(wrapper.find('.details').text()).equal('محمود شاكر (أبو فهر)')
        expect(wrapper.find('.details').attributes()).toHaveProperty('href', '/poet/e7749f21-9cf9-4981-b7a8-2ce262f159f6')

        const printSpy = vi.spyOn(printsActions, 'add');
        await wrapper.find('.print-button').trigger('click');

        expect(printSpy).toHaveBeenCalled();
        expect(printSpy).toHaveBeenCalledWith({
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            qoute:  'الأمم العربيّة الآن تحتاج إلى من يذكّرها بمجد وعزّ وحضارة أجدادها؛ لتجد في نفسها مضض الحسرة، وفي الحسرة الألم، وفي الألم الشعور، وفي الشعور الحياة والطموح والشوق إلى الفوز والغلبة.',
        });
    })
})  