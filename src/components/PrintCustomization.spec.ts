import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils';
// Components
import PrintCustomization from './PrintCustomization.vue';

describe('<PrintCustomization />', () => {
    it('Contains 8 colors for Fonts & backgound each', () => {
        const wrapper = mount(PrintCustomization, {
            props: {
                currentLocale: "ar"
            }
        });

        expect(wrapper.findAll('.colors')[0].text()).equal('الخط:')
        expect(wrapper.findAll('.colors')[1].text()).equal('الخلفية:')
        expect(wrapper.findAll('.colors > button').length).equal(16)
    })
})