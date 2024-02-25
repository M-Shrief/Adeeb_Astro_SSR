import {shallowRef, computed} from '@vue/reactivity';
// Composables
import {useFetchError} from '../composables/errorsNotifications';
// Utils
import {apiURL} from '../utils/fetch';
// Types
import type {ChosenVerse} from './__types__';

const chosenVerses = shallowRef<ChosenVerse[]>([]);

/**
 * Get chosenVerses computed value.
 */
export const getChosenVerses = computed<ChosenVerse[]>(() => {
  return chosenVerses.value;
})

/**
 * Fetch chosenVerses from API, and assign it to chosenVerses ref.
 * @returns 
 */
export async function fetchChosenVerses() {
  if(chosenVerses.value.length != 0) return
  
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

/**
 * Get randomChosenVerses computed value.
 */
export const getRandomChosenVerses = computed<ChosenVerse[]>(() => {
  return randomChosenVerses.value;
})

/**
 * Fetch random chosenVerses from API, and assign it to randomChosenVerses ref.
 * @param {number} num - number of random chosenVerses
 */
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
