import {ref, computed} from '@vue/reactivity'
// Composables
import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {ChosenVerse} from './__types__';
import {AxiosError} from 'axios';

const chosenVerses = ref<ChosenVerse[]>([]);

export const getChosenVerses = computed<ChosenVerse[]>(() => {
  return chosenVerses.value;
})

export async function fetchChosenVerses() {
  try {
    const req = await baseHttp.get(`/chosenverses`);
    chosenVerses.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
}

const randomChosenVerses = ref<ChosenVerse[]>([]);

export const getRandomChosenVerses = computed<ChosenVerse[]>(() => {
  return chosenVerses.value;
})

export async function fetchRandomChosenVerses(num: number) {
  try {
    const req = await baseHttp.get(`/chosenverses/random?num=${num}`);
    randomChosenVerses.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
}
