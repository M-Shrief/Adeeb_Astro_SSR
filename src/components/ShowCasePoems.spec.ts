import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Componetns
import ShowCasePoems from './ShowCasePoems.vue';
import type { Poem, Poet } from '../stores/__types__';

describe('ShowCasePoems', () => {
    it('renders on main page, with poet name', () => {
        const wrapper = mount(ShowCasePoems, {
            props: {
                poems: [
                    {
                      id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
                      intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                      poet: {
                        id: '6371ea89885e286801faccaa',
                        name: 'التهامي',
                      },
                      reviewed: true,
                    } as Poem
                ],
                currentLocale: "ar"
            }
        })

        expect(wrapper.find('.poem p').text()).toEqual('حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري - التهامي');
        expect(wrapper.find('.poem').attributes()).toHaveProperty('href', '/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6');
    })
    it('renders on poet page, without poet name', () => {
        const wrapper = mount(ShowCasePoems, {
            props: {
                poems: [
                    {
                        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
                        intro: 'حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري',
                        reviewed: true,
                    } as Poem
                ],
                currentLocale: "ar"
            }
        })

        expect(wrapper.find('.poem p').text()).toEqual('حُكمُ المَنِيَّةِ في البَرِيَّةِ جاري..');
        expect(wrapper.find('.poem').attributes()).toHaveProperty('href', '/poem/e7749f21-9cf9-4981-b7a8-2ce262f159f6');
    })
})