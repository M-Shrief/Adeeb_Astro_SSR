import {map, atom, action} from 'nanostores';
// Composables
import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {Poet} from './__types__';
import {AxiosError} from 'axios';

export const $poets = atom<Poet[]>([]);


export const fetchPoets = action($poets, 'fetchPoets', async () => {
    try {
        const req = await baseHttp.get(`/poets`);
        $poets.set(req.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            useAxiosError(error);
        return;
    }
        alert(error);
    }
});

export const $poet = map<Poet>();
export const fetchPoet = action($poet, 'fetchPoet', async (poet, id: string) => {
    try {
        const req = await baseHttp.get(`/poet/${id}`);
        poet.set(req.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            useAxiosError(error);
        return;
    }
        alert(error);
    }

});