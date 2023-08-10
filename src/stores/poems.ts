import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import {baseHttp} from '../utils/axios'
// types
import type { Poem } from './__types__';
// Composables
// import { useAxiosError } from '../composables/error';

export const usePoemStore = defineStore('poems', () => {
  const poems = ref<Poem[]>([]);
  const getPoems = computed<Poem[]>(() => poems.value);


  async function fetchPoems() {
    try {
      const req = await baseHttp.get(
        `/poems_intros`
      );
      poems.value = req.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  const poem = ref<Poem>({});
  const getPoem = computed<Poem>(() => poem.value);
  async function fetchOtherPoems(id: string) {
    try {
      let reqPoemsIntros = await baseHttp.get(`/poems_intros`);

      let poemIndex = reqPoemsIntros.data
        .map((poem: Poem) => poem.id)
        .indexOf(id);
      reqPoemsIntros.data.splice(poemIndex, 1);
      poems.value = reqPoemsIntros.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // useAxiosError(error);
        return;
      }
      alert(error);
    }
  };
    
  async function fetchPoemAndSuggestedPoems(id: string) {
    try {
      let reqPoem = await baseHttp.get(`/poem/${id}`);
      poem.value = reqPoem.data;

      fetchOtherPoems(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        // useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  return {getPoems, getPoem, fetchPoems, fetchOtherPoems, fetchPoemAndSuggestedPoems}
});
