import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils';
// Components
import NavbarRoutes from './NavbarRoutes.vue';
// Stores
import { partner, actions as partnerActions} from '../stores/partners';

describe('Navbar links', () => {
    it('renders alright and reference right page when partner = null', async () => {
        const wrapper = mount(NavbarRoutes, {
            props: {
                activeUrl: '/ordering',
                currentLocale: "ar"
            }
        })

        expect(wrapper.find('a[href="/ordering"]').exists()).equal(true);
        expect(wrapper.find('a[href="/history"]').exists()).equal(true);
        expect(wrapper.find('a[href="/about"]').exists()).equal(true);
        expect(wrapper.find('a[href="/partners/auth"]').exists()).equal(true);
        expect(wrapper.find('span.nav-item').exists()).equal(false);
    })
    it('renders alright and reference right page when partner is logged in, and the partner is able to logout.', () => {
        partner.value = JSON.stringify({
            id: 'e7749f21-9cf9-4981-b7a8-2ce262f159f6',
            name: 'Astro SSR',
            phone: '01023669999',
        });
        const wrapper = mount(NavbarRoutes, {
            props: {
                activeUrl: '/',
                currentLocale: "ar"
            }
        })
        expect(wrapper.find('a[href="/partners/ordering"]').exists()).equal(true);
        expect(wrapper.find('a[href="/partners/history"]').exists()).equal(true);
        expect(wrapper.find('a[href="/about"]').exists()).equal(true);

        expect(wrapper.find('.partner-name').text()).equal('Astro SSR');
        const logoutInput = wrapper.find('span.nav-item');
        expect(logoutInput.text()).equal('تسجيل الخروج');
        const logout = vi.spyOn(partnerActions, 'logout');
        logoutInput.trigger('click');
        expect(logout).toHaveBeenCalled();
    })
})  