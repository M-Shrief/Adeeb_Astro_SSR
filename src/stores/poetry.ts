import {ref, computed} from '@vue/reactivity';
// Stores
import {fetchChosenVerses, getChosenVerses} from './chosenVerses'
import {fetchProses, getProses} from './proses'
// Composables
import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {shuffle} from '../utils/shuffle';
// Types
import type {Poetry} from './__types__';
import {AxiosError} from 'axios';

const poetry = ref<Poetry[]>([]);

export const getPoetry = computed(() => {
    return poetry.value;
})

export async function fetchPoetry() {
    try {
        await Promise.allSettled([
            await fetchChosenVerses(),
            await fetchProses(),
        ]);

        poetry.value = [...getChosenVerses.value, ...getProses.value];
        await shuffle(poetry.value);
    } catch (error) {
        if (error instanceof AxiosError) {
            useAxiosError(error);
            return;
        }
        alert(error);
    }
}