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

export const $poemId = atom<string>('');

export const fetchOtherPoems = action($poemId, 'fetchOtherPoems', async($poemId) => {
    try {
      let reqPoemsIntros = await baseHttp.get(`/poems_intros`);

      let poemIndex = reqPoemsIntros.data
        .map((poem: Poem) => poem.id)
        .indexOf($poemId.get());
      reqPoemsIntros.data.splice(poemIndex, 1);
      $poems.set(reqPoemsIntros.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        // useAxiosError(error);
        return;
      }
      alert(error);
    }
  }) 

export const fetchPoem = action($poemId, 'fetchPoem', async($poemId) => {
    try {
        let reqPoem = await baseHttp.get(`/poem/${$poemId.get()}`);
        $poem.set(reqPoem.data);
  
        fetchOtherPoems();
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
})