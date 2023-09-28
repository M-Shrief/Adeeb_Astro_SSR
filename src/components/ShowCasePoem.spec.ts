import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils';
// Components
import ShowCasePoem from './ShowCasePoem.vue';
// Stores
import {actions as printsActions} from '../stores/prints';
// Types
import type { Poem } from '../stores/__types__';

describe('Renders poem properly', () => {
    it('it render the verse properly and emit an event for print the verse when clicked',async () => {
        const addPrint= vi.spyOn(printsActions, 'add');

        const wrapper = mount(ShowCasePoem, {
            props: {
                verses: [
                    {
                        "first": "فهوَ أمواجُ ظلامٍ .. لا تَرَى",
                        "sec": "لا تُبَالي .. لا تَعِي .. لا تَحْتَمي"
                    },
                ],
            }
        })

        expect(wrapper.get('.verse .first').text()).equal("فهوَ أمواجُ ظلامٍ .. لا تَرَى")
        expect(wrapper.find('.verse .sec').text()).equal("لا تُبَالي .. لا تَعِي .. لا تَحْتَمي")

        await wrapper.find('.verse').trigger('dblclick')
        expect(addPrint).toHaveBeenCalled()
        expect(addPrint).toHaveBeenCalledWith({id: "0", verses: [
            {
                "first": "فهوَ أمواجُ ظلامٍ .. لا تَرَى",
                "sec": "لا تُبَالي .. لا تَعِي .. لا تَحْتَمي"
            },
        ]})
    })
})