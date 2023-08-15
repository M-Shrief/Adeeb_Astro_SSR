import {ref, computed} from '@vue/reactivity';
// Composables
import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {Prose} from './__types__';
import {AxiosError} from 'axios';

const proses = ref<Prose[]>([]);

export const getProses = computed<Prose[]>(() => {
  return proses.value;
});

export async function fetchProses() {
  try {
    const req = await baseHttp.get(`/proses`);
    proses.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
}

const randomProses = ref<Prose[]>([]);

export const getRandomProses = computed<Prose[]>(() => {
  return randomProses.value;
});

export async function fetchRandomProses(num: number) {
  try {
    const req = await baseHttp.get(`/proses/random?num=${num}`);
    randomProses.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
}