import {map, atom, action} from 'nanostores';
// Composables
// import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {Prose} from './__types__';
import {AxiosError} from 'axios';

export const $proses = atom<Prose[]>([]);
export const fetchProses = action($proses, 'fetchProses', async(proses) => {
    try {
        const req = await baseHttp.get(`/proses`);
        proses.set(req.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
})

export const $randomProses = atom<Prose[]>([]);
export const fetchRandomProses = action($randomProses, 'fetchRandomProses', async(randomProses, num: number) => {
    try {
        const req = await baseHttp.get(`/proses/random?num=${num}`);
        randomProses.set(req.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
})