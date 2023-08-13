import {map, atom, action} from 'nanostores';
// Composables
// import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {ChosenVerse} from './__types__';
import {AxiosError} from 'axios';

export const $chosenVerses = atom<ChosenVerse[]>([]);
export const fetchChosenVerses = action($chosenVerses, 'fetchChosenVerses', async(chosenVerses) => {
    try {
        const req = await baseHttp.get(`/chosenverses`);
        chosenVerses.set(req.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
})


export const $randomChosenVerses = atom<ChosenVerse[]>([]);
export const fetchRandomChosenVerses = action($randomChosenVerses, 'fetchRandomChosenVerses', async(randomChosenVerses, num: number) => {
    try {
      const req = await baseHttp.get(`/chosenverses/random?num=${num}`);
      randomChosenVerses.set(req.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // useAxiosError(error);
        return;
      }
      alert(error);
    }
})

