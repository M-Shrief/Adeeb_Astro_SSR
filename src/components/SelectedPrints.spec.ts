import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Components
import SelectedPrints from './SelectedPrints.vue';
// Stores
import {actions as printsActions, prints} from '../stores/prints';
import {partner} from '../stores/partners';

describe('<SelectedPrints />', () => {
    it('show a sample of print.verses, with the ability to remove them by dblClick .prints-item, title link to /ordering when isPartner = false.', async () => {
        const removeSpy = vi.spyOn(printsActions, 'remove');
        prints.value = [
            {
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              verses: [
                {
                  first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                  sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                },
              ],
            }
        ];
        const wrapper = mount(SelectedPrints, {
          props: {
            currentLocale: "ar"
          }
        });

        expect(wrapper.find('.prints-item>p').text()).equal('حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..')
        expect(wrapper.find('.title').attributes()).toHaveProperty('href', '/ordering')
        await wrapper.find('.prints-item').trigger('dblclick');

        expect(removeSpy).toHaveBeenCalled()
        expect(removeSpy).toHaveBeenCalledWith(
            {
              id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
              verses: [
                {
                  first: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                  sec: 'ما هَذِهِ الدُنيا بِدار قَرار',
                },
              ],
            }
        )
        
    })
})  