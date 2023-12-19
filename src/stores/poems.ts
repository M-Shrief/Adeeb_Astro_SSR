import {shallowRef,computed} from '@vue/reactivity';
// Composables
import {useAxiosError, useFetchError} from '../composables/errorsNotifications';
// Utils
import {baseHttp} from '../utils/axios';
import {apiURL} from '../utils/fetch';
// Types
import type {Poem} from './__types__';
import {AxiosError} from 'axios';
 
const poems = shallowRef<Poem[]>([]);

export const getPoems = computed<Poem[]>(() => { return poems.value });

export async function fetchPoems() {
  const res = await fetch(
    apiURL(`/poems_intros`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    poems.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
}

const poem = shallowRef<Poem>({} as Poem);

export const getPoem = computed<Poem>(() => { return poem.value}); 

const otherPoems = shallowRef<Poem[]>([]);
export const getOtherPoems = computed<Poem[]>(() => { return otherPoems.value});

export async function fetchOtherPoems(id: string) {
  try {
    if(getPoems.value.length === 0) await fetchPoems();
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
  const res = await fetch(
    apiURL(`/poem/${id}`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    poem.value = await res.json()
    await fetchOtherPoems(id)
  } else {
    useFetchError(await res.json())
  }
}