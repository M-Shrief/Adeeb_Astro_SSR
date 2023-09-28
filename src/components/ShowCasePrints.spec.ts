import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount, enableAutoUnmount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Componetns
import ShowCasePrints from './ShowCasePrints.vue';



describe('Show case Print', () => {
    enableAutoUnmount(afterEach)
    it('Renders text prints properly', () => {
        const wrapper = mount(ShowCasePrints, {
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
              },
        })

        expect(wrapper.findAll('.print-item .verse>p')[0].text()).equal('نَظْرةٌ, ثُمَّ هَوًى, ثُمَّ مُنًى');
        expect(wrapper.findAll('.print-item .verse>p')[1].text()).equal('ثُمَّ .. وَانْفَضَ كَأَنْ لم تَحْلُمِ');
        expect(wrapper.find('.print-item .qoute>p').text()).equal( 'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.');
    })
    it('It emit print with proper values', async () => {
        const wrapper = mount(ShowCasePrints, {
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
            }
        })

        await wrapper.findAll('.print-item>div')[0].trigger('click');
        await wrapper.findAll('.print-item>div')[1].trigger('click');

        await flushPromises();

        await waitForExpect(() => {
            const printSpy = wrapper.emitted('print');
            expect(printSpy).toHaveLength(2)
            expect(printSpy![0][0]).toEqual({
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
            })
            expect(printSpy![1][0]).toEqual({
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              qoute:
                'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
            })
        })
    })
    it('It emit remove with proper values', async () => {
      const wrapper = mount(ShowCasePrints, {
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
          }
      })


      await wrapper.findAll('.print-item>button')[0].trigger('click');
      await wrapper.findAll('.print-item>button')[1].trigger('click');

      await flushPromises();

      await waitForExpect(() => {
          const removeSpy = wrapper.emitted('remove');
          expect(removeSpy).toHaveLength(2)
          expect(removeSpy![0][0]).toEqual({
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
          })
          expect(removeSpy![1][0]).toEqual({
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            qoute:
              'اذكروا اسمَ عدوّكم فإنّ نسيانه جريمة، واعرفوا عمل عدوّكم فإنّ جهله هو الذلّ، وحرّضوا أنفسكم على أن تقاتلوه بالليل والنهار في تفكيركم وأعمالكم، لا تنسَوا، فإنّ النسيان هو الهلاك.',
          })
      })
  })
})        
