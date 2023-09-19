/*
    Just using Vuejs' Composition API here
    Note: Only use on client
**/ 
import {ref, computed} from '@vue/reactivity';
// Types
import type { Print, ChosenVerse, Prose } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';

export const prints =  ref(useSessionStorage('prints', [] as Print[]));

export const getPrints =  computed<Print[]>(() => {
  return prints.value;
});

function addPrint(print: Print) {
  const printsIds = prints.value.map((printItem) => printItem.id);
  if (!printsIds.includes(print.id)) {
    prints.value.push(print);
  }
};

function prepPrints(printsData: ChosenVerse[] | Prose[]) {
  // it's normal in big orders to repeat the same print
  prints.value = prints.value.concat(printsData as Print[]);
};

function removePrint(print: Print) {
  let printIndex = prints.value
    .map((verse) => verse.id)
    .indexOf(print.id);
  prints.value.splice(printIndex, 1);
};

function removeAllPrints(): void {
  prints.value = []
}

export const actions = {
  add: addPrint,
  prep: prepPrints,
  remove: removePrint,
  removeAll: removeAllPrints
};