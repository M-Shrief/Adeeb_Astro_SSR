import {ref, computed} from '@vue/reactivity';
// Composables
import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {Poet} from './__types__';
import {AxiosError} from 'axios';

const poets = ref<Poet[]>([]);

export const getPoets = computed<Poet[]>(() => {
    return poets.value;
});

export const fetchPoets = async () => {
    try {
        const req = await baseHttp.get(`/poets`);
        poets.value = req.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            useAxiosError(error);
        return;
    }
        alert(error);
    }
};

const poet = ref<Poet>({} as Poet);

export const getPoet = computed<Poet>(() => {
    return poet.value;
});

export const fetchPoet = async (id: string) => {
    try {
        const req = await baseHttp.get(`/poet/${id}`);
        poet.value = req.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            useAxiosError(error);
        return;
    }
        alert(error);
    }

};