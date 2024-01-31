import { describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils';
import waitForExpect from 'wait-for-expect';
// Components
import AuthForm from './AuthForm.vue';
// Stores
import { actions as partnerActions} from '../stores/partners';

describe('<AuthForm />',  async () => {
    it('Login', async() => {
        const loginSpy = vi.spyOn(partnerActions, "login").mockResolvedValue()
        const wrapper = mount(AuthForm, {
            props: {
                currentLocale: "ar"
            }
        });

        await wrapper.find('#phone').setValue('01235554567');
        await wrapper.find('#password').setValue('P@ssword1');

        await wrapper.find('button[type=submit]').trigger('submit');
        await flushPromises();

        await waitForExpect(() => {
            expect(loginSpy).toHaveBeenCalled();
            expect(loginSpy).toHaveBeenCalledWith({phone: '01235554567', password: 'P@ssword1'});
        })
    })

    it('Signup', async () => {
        const signup = vi.spyOn(partnerActions, 'signup').mockResolvedValue();
        const wrapper = mount(AuthForm, {
            props: {
                currentLocale: "ar"
            }
        });        
        await wrapper.find('#toggle').trigger('click')

        await wrapper.find('#name').setValue('new User')
        await wrapper.find('#phone').setValue('01235554567');
        await wrapper.find('#password').setValue('P@ssword1');
        await wrapper.find('button[type=submit]').trigger('submit')
        await flushPromises();

        await waitForExpect(() => {
            expect(signup).toHaveBeenCalled()
            expect(signup).toHaveBeenCalledWith({
                name: 'new User',
                phone: '01235554567',
                password: 'P@ssword1'
            });
        })

    })
})