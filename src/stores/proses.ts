import {shallowRef, computed} from '@vue/reactivity';
// Composables
import { useFetchError} from '../composables/errorsNotifications';
// Utils
import {apiURL} from '../utils/fetch';
// Types
import type {Prose} from './__types__';

const proses = shallowRef<Prose[]>([]);

/**
 * Get Proses computed value
 */
export const getProses = computed<Prose[]>(() => {
  return proses.value;
});

/**
 * Fetch Proses from API, and assign it to proses.value
 * @returns 
 */
export async function fetchProses() {
  if(proses.value.length != 0) return
  
  const res = await fetch(
    apiURL(`/proses`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    proses.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
}

const randomProses = shallowRef<Prose[]>([]);

/**
 * Get randomProses computed value.
 */
export const getRandomProses = computed<Prose[]>(() => {
  return randomProses.value;
});

/**
 * Fetch random proses from API, and assign it to randomProses ref.
 * @param {number} num - number of random proses
*/
export async function fetchRandomProses(num: number) {
  const res = await fetch(
    apiURL(`/proses/random?num=${num}`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    randomProses.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
}