import {shallowRef, computed} from '@vue/reactivity';
// Composables
import { useFetchError} from '../composables/errorsNotifications';
// Utils
import {apiURL} from '../utils/fetch';
// Types
import type {Prose} from './__types__';

const proses = shallowRef<Prose[]>([]);

export const getProses = computed<Prose[]>(() => {
  return proses.value;
});

export async function fetchProses() {
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

export const getRandomProses = computed<Prose[]>(() => {
  return randomProses.value;
});

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