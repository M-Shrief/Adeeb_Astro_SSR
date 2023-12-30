import {shallowRef,computed} from '@vue/reactivity';
// Composables
import {useFetchError} from '../composables/errorsNotifications';
// Utils
import {apiURL} from '../utils/fetch';
// Types
import type {Poem} from './__types__';
 
const poems = shallowRef<Poem[]>([]);

export const getPoems = computed<Poem[]>(() => { return poems.value });

export async function fetchPoems() {
  if(poems.value.length != 0) return
  
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

export async function fetchPoem(id: string) {
  if(poem.value.id == id) return

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

const otherPoems = shallowRef<Poem[]>([]);
export const getOtherPoems = computed<Poem[]>(() => { return otherPoems.value});

export async function fetchOtherPoems(id: string) {
  if(poems.value.length === 0) await fetchPoems();
  const poemsArr = [...getPoems.value];
  let poemIndex = poemsArr.map((poem: Poem) => poem.id).indexOf(id);
  poemsArr.splice(poemIndex, 1);
  otherPoems.value = poemsArr;
}
