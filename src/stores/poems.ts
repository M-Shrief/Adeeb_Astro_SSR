import {shallowRef,computed} from '@vue/reactivity';
// Composables
import {useFetchError} from '../composables/errorsNotifications';
// Utils
import {apiURL} from '../utils/fetch';
// Types
import type {Poem} from './__types__';
 
const poems = shallowRef<Poem[]>([]);

/**
 * Get Poems computed value
 */
export const getPoems = computed<Poem[]>(() => { return poems.value });

/**
 * Fetch Poems from API, and assign it to poems.value
 * @returns 
 */
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

/**
 * Get Poem computed value
 */
export const getPoem = computed<Poem>(() => { return poem.value}); 

/**
 * Fetch Poem from API, and assign it to poem.value. And fetch other poems.
 */
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

/**
 * Get OtherPoems computed value
 */
export const getOtherPoems = computed<Poem[]>(() => { return otherPoems.value});

/**
 * fetch Poem with different ID than the parameter.
 * 
 * it uses existing poems ref to get them, if it doesn't exists, it uses the API.
 * 
 * @param {string} id - poem's id that we don't want
 */
export async function fetchOtherPoems(id: string) {
  if(poems.value.length === 0) await fetchPoems();
  const poemsArr = [...getPoems.value];
  let poemIndex = poemsArr.map((poem: Poem) => poem.id).indexOf(id);
  poemsArr.splice(poemIndex, 1);
  otherPoems.value = poemsArr;
}
