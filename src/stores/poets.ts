import {shallowRef, computed} from '@vue/reactivity';
// Composables
import { useFetchError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
import {apiURL} from '../utils/fetch';
// Types
import type {Poet} from './__types__';
import {AxiosError} from 'axios';

const poets = shallowRef<Poet[]>([]);

export const getPoets = computed<Poet[]>(() => {
    return poets.value;
});

export const fetchPoets = async () => {
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

export const getPoet = computed<Poet>(() => {
    return poet.value;
});

export const fetchPoet = async (id: string) => {
    const res = await fetch(
        apiURL(`/poet/${id}`), 
        {
            method: "GET"
        }
    )

    if (res.ok) {
        poet.value = await res.json()
    } else {
        useFetchError(await res.json())
    }
};