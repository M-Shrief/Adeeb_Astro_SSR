import {shallowRef, computed} from '@vue/reactivity';
// Composables
import { useFetchError} from '../composables/errorsNotifications';
// Utils
import {apiURL} from '../utils/fetch';
import {shuffle} from "../utils/shuffle"
// Types
import type {Poet, Poetry} from './__types__';


const poets = shallowRef<Poet[]>([]);

/**
 * Get Poets computed value
 */
export const getPoets = computed<Poet[]>(() => {
    return poets.value;
});

/**
 * Fetch poets from API, and assign it to poets.value
 */
export const fetchPoets = async () => {
    if (poets.value.length != 0) return

    const res = await fetch(
        apiURL(`/poets`), 
        {
            method: "GET"
        }
    )

    if (res.ok) {
        poets.value = await res.json()
    } else {
        useFetchError(await res.json())
    }
};

const poet = shallowRef<Poet>({} as Poet);

/**
 * Get Poet computed value
 */
export const getPoet = computed<Poet>(() => {
    return poet.value;
});

/**
 * Fetch Poet from API, and assign it to poet.value
 * @returns 
 */
export const fetchPoet = async (id: string) => {
    if(poet.value.id == id) return

    const res = await fetch(
        apiURL(`/poet/${id}`), 
        {
            method: "GET"
        }
    )

    if (res.ok) {
        poet.value = await res.json()
        // Combining Poet's poetry and shuffling it.
        const poetry = [
            ...poet.value.chosenVerses,
            ...poet.value.proses,
        ] as Poetry[];
        await shuffle(poetry);
        poet.value.poetry = poetry;
    } else {
        useFetchError(await res.json())
    }
};