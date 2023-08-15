import {ref, computed} from '@vue/reactivity';
// Composables
import {useAxiosError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {Poem} from './__types__';
import {AxiosError} from 'axios';
 
const poems = ref<Poem[]>([]);

export const getPoems = computed<Poem[]>(() => { return poems.value });

export async function fetchPoems() {
  try {
    const req = await baseHttp.get(`/poems_intros`);
    poems.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
}
}

const poem = ref<Poem>({} as Poem);

export const getPoem = computed<Poem>(() => { return poem.value}); 

const otherPoems = ref<Poem[]>([]);
export const getOtherPoems = computed<Poem[]>(() => { return otherPoems.value});

export async function fetchOtherPoems(id: string) {
  try {
    if(getPoems.value.length === 0) await fetchPoems();
    console.log('used getPoems');
    const poemsArr = [...getPoems.value];
    let poemIndex = poemsArr.map((poem: Poem) => poem.id).indexOf(id);
    poemsArr.splice(poemIndex, 1);
    otherPoems.value = poemsArr;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
}

export async function fetchPoem(id: string) {
  try {
    let reqPoem = await baseHttp.get(`/poem/${id}`);
    poem.value = reqPoem.data;

    await fetchOtherPoems(id)
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
}