import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils';
// Componetns
import ShowCasePoet from './ShowCasePoet.vue';

describe('<ShowCasePoet />', () => {
    it("Renders poet's name and bio", () => {
        const wrapper = mount(ShowCasePoet, {
            props: {
                details: {
                  name: 'عنترة بن شداد',
                  time_period: 'العصر الجاهلي',
                  bio: 'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.',
                },
            },
        })

        expect(wrapper.find('.poet>h2').text()).equal('عنترة بن شداد - العصر الجاهلي');
        expect(wrapper.find('.poet>.bio').text()).equal( 'عنترة بن عمرو بن شداد بن معاوية بن قراد العبسي (525 م - 608 م) هو أحد أشهر شعراء العرب في فترة ما قبل الإسلام، اشتهر بشعر الفروسية، وله معلقة مشهورة. وهو أشهر فرسان العرب وأشعرهم وشاعر المعلقات والمعروف بشعره الجميل وغزله العفيف بعبلة.')
    })
})