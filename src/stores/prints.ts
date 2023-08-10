import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
// Types
import type { Print } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';


export const usePrintsStore = defineStore('prints', () => {
  const prints =  ref(useSessionStorage('prints', [] as Print[]));
  const getPrints =  computed<Print[]>(() => {
    return prints.value;
  });
  function addPrint(print: Print) {
    const printsIds = prints.value.map(
      (printItem) =>
        // printItem.id ? printItem.id : printItem.verses[0].id
        printItem.id
    );
    // const printId = print.id ? print.id : print.verses[0].id;
    if (!printsIds.includes(print.id)) {
      prints.value.push(print);
    }
  };
  function prepPrints(printsData: Print[]) {
    // it's normal in big orders to repeat the same print
    prints.value = prints.value.concat(printsData);
  };
  function removePrint(print: Print) {
    let printIndex = prints.value
      .map((verse) => verse.id)
      .indexOf(print.id);
    prints.value.splice(printIndex, 1);
  };
  function emptyPrints(): void {
    prints.value = []
  }

  return {getPrints, addPrint, prepPrints, removePrint, emptyPrints}
});
