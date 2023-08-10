import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import {baseHttp} from '../utils/axios'
// Types
import type { Poet } from './__types__';
// Composables
// import { useAxiosError } from '../composables/error';

export const usePoetStore = defineStore('poets', () => {
 const poets = ref<Poet[]>([])
 const getPoets = computed<Poet[]>(() => poets.value)
 async function fetchPoets() {
  try {
    const req = await baseHttp.get(`/poets`);
    poets.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // useAxiosError(error);
      return;
    }
    alert(error);
  }
};

 const poet = ref<Poet | null>(null)
 const getPoet = computed<Poet | null>(() => poet.value)
 async function fetchPoet(id: string) {
  try {
    const req = await baseHttp.get(`/poet/${id}`);
    poet.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // useAxiosError(error);
      return;
    }
    alert(error);
  }
 };

 return {getPoets, fetchPoets, getPoet, fetchPoet}
});
