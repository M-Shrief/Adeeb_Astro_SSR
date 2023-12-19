import {shallowRef, computed} from '@vue/reactivity';
// Stores
import {fetchChosenVerses, getChosenVerses} from './chosenVerses'
import {fetchProses, getProses} from './proses'
// Utils
import {shuffle} from '../utils/shuffle';
// Types
import type {Poetry} from './__types__';
import {AxiosError} from 'axios';

const poetry = shallowRef<Poetry[]>([]);

export const getPoetry = computed(() => {
    return poetry.value;
})

export async function fetchPoetry() {
    await Promise.allSettled([
        await fetchChosenVerses(),
        await fetchProses(),
    ]);

    poetry.value = [...getChosenVerses.value, ...getProses.value];
    await shuffle(poetry.value);
}