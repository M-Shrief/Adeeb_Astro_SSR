import {shallowRef, computed} from '@vue/reactivity';
// Stores
import {fetchChosenVerses, getChosenVerses} from './chosenVerses'
import {fetchProses, getProses} from './proses'
// Utils
import {shuffle} from '../utils/shuffle';
// Types
import type {Poetry} from './__types__';

const poetry = shallowRef<Poetry[]>([]);

/**
 * Get Poetry computed value
 */
export const getPoetry = computed(() => {
    return poetry.value;
})

/**
 * Fetch Poetry (chosenVerses, proses) from API, and compining and shuffling them, and assign them to poetry ref
 * @returns 
 */
export async function fetchPoetry() {
    if(poetry.value.length != 0) return
    
    await Promise.allSettled([
        await fetchChosenVerses(),
        await fetchProses(),
    ]);

    poetry.value = [...getChosenVerses.value, ...getProses.value];
    await shuffle(poetry.value);
}