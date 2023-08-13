/*
    Just using Vuejs' Composition API here
    Note: Only use on client
**/ 
import {ref, computed} from 'vue';
// Types
import type { Print } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';

const prints =  ref(useSessionStorage('prints', [] as Print[]));

export const getPrints =  computed<Print[]>(() => {
  return prints.value;
});

export function addPrint(print: Print) {
  const printsIds = prints.value.map((printItem) => printItem.id);
  if (!printsIds.includes(print.id)) {
    prints.value.push(print);
  }
};

export function prepPrints(printsData: Print[]) {
  // it's normal in big orders to repeat the same print
  prints.value = prints.value.concat(printsData);
};

export function removePrint(print: Print) {
  let printIndex = prints.value
    .map((verse) => verse.id)
    .indexOf(print.id);
  prints.value.splice(printIndex, 1);
};

export function emptyPrints(): void {
  prints.value = []
}