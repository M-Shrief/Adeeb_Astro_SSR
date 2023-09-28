import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils';
// Components
import ShowCasePoets from './ShowCasePoets.vue';
// Types
import type { Poet } from '../stores/__types__';

describe('<ShowCasePoets />', () => {
    it('It render a link with poetName', () => {
        const wrapper = mount(ShowCasePoets, {
            props: {
                poets: [
                    {
                        id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
                        name: 'عنترة بن شداد',
                        time_period: 'العصر الجاهلي',
                    } as Poet,
                ],
            }
        })
        expect(wrapper.find('a[href*="/poet/e7749f21-9cf9-4981-b7a8-2ce262f159f6"').exists()).equal(true)
        expect(wrapper.get('.poet p').text()).equal('عنترة بن شداد')
    })
})