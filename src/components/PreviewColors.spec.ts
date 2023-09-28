import { describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Components
import PreviewColors from './PreviewColors.vue';

describe('<PreviewColors />', () => {
    it('renders', async () => {
        const wrapper = mount(PreviewColors, {
            props: {
                colors: ['#000']
            }
        })

        await wrapper.find('div>.color').trigger('click');
        
        const colorSpy = wrapper.emitted('color');
        await flushPromises();

        await waitForExpect(() => {
            expect(colorSpy).toBeTruthy();
            expect(colorSpy![0][0]).toEqual('#000')
        })
    })
})