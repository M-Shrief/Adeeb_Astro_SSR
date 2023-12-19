import {shallowRef, computed} from '@vue/reactivity';
// Composables
import {useAxiosError, useFetchError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
import {apiURL} from '../utils/fetch';
// Types
import type {ChosenVerse} from './__types__';
import {AxiosError} from 'axios';

const chosenVerses = shallowRef<ChosenVerse[]>([]);

export const getChosenVerses = computed<ChosenVerse[]>(() => {
  return chosenVerses.value;
})

export async function fetchChosenVerses() {
  const res = await fetch(
    apiURL(`/chosenverses`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    chosenVerses.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
}

const randomChosenVerses = shallowRef<ChosenVerse[]>([]);

export const getRandomChosenVerses = computed<ChosenVerse[]>(() => {
  return randomChosenVerses.value;
})

export async function fetchRandomChosenVerses(num: number) {
  const res = await fetch(
    apiURL(`/chosenverses/random?num=${num}`), 
    {
      method: "GET",
    }
  )

  if (res.ok) {
    randomChosenVerses.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
}
