import {atom, map, action} from 'nanostores';
// Utils
import {baseHttp} from '../utils/axios';
// Types
import type {Poem} from './__types__';
import {AxiosError} from 'axios';
 

export const $poems = atom<Poem[]>([]);

export const fetchPoems = action($poems, 'fetchPoems', async() => {
    try {
        const req = await baseHttp.get(
          `/poems_intros`
        );
        $poems.set(req.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
    }
})

export const $poem = map<Poem>();

// We can limit server request, 
// if we added another variable (otherPoems) that take data directly from $poems
// and filter it, if ($poems.length ===0) it make the request.

export const fetchOtherPoems = action($poems, 'fetchOtherPoems', async(poems, id: string) => {
    try {
      let reqPoemsIntros = await baseHttp.get(`/poems_intros`);

      let poemIndex = reqPoemsIntros.data
        .map((poem: Poem) => poem.id)
        .indexOf(id);
      reqPoemsIntros.data.splice(poemIndex, 1);
      poems.set(reqPoemsIntros.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // useAxiosError(error);
        return;
      }
      alert(error);
    }
  }) 

export const fetchPoem = action($poem, 'fetchPoem', async(poem, id: string) => {
    try {
        let reqPoem = await baseHttp.get(`/poem/${id}`);
        poem.set(reqPoem.data);
  
        fetchOtherPoems(id);
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
})