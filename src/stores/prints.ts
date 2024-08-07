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

/**
 * Get Prints computed value
 */
export const getPrints =  computed<Print[]>(() => {
  return prints.value;
});

/**
 * Add Print to prints ref, if it doesn't exist already.
 * @param {Print} print 
 */
function addPrint(print: Print) {
  const printsIds = prints.value.map((printItem) => printItem.id);
  if (!printsIds.includes(print.id)) {
    prints.value.push(print);
  }
};

/**
 * Add multiple prints without checking if they already exists or not.
 * @param printsData 
 */
function prepPrints(printsData: ChosenVerse[] | Prose[]) {
  // it's normal in big orders to repeat the same print
  prints.value = prints.value.concat(printsData as Print[]);
};

/**
 * Remove print from prints.value
 * @param print 
 */
function removePrint(print: Print) {
  let printIndex = prints.value.findIndex((item) => item.id === print.id)
  prints.value.splice(printIndex, 1);
};

/**
 * Remove all Prints
 */
function removeAllPrints(): void {
  prints.value = []
}

export const actions = {
  add: addPrint,
  prep: prepPrints,
  remove: removePrint,
  removeAll: removeAllPrints
};

// Testing
if (import.meta.vitest) {
  const { describe, it, expect, afterEach } = import.meta.vitest
  describe.concurrent('Testing Prints actions', () => {
    afterEach(() => { prints.value = []})
    it('addPrint(): addPrint correctly, and it do not duplicate existing prints', async ({ expect }) => {
      const print: Print = {id: '12', qoute: 'aaa'};
      addPrint(print);
      expect(prints.value).toStrictEqual([print]); 
      addPrint(print);
      expect(prints.value).toStrictEqual([print]);
    })
    it('prepPrints(): it adds an array of prints', async ({ expect }) => {
      const preparedPrints = [
        {id: '1', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'aaa'},
        {id: '2', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'bbb'},
      ] as Prose[];
      prepPrints(preparedPrints);
      expect(prints.value).toStrictEqual(preparedPrints)
    })
    it('removePrint(): it remove specified prints after mapping prints array to know print.id', async({expect}) => {
      const preparedPrints = [
        {id: '1', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'aaa'},
        {id: '2', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'bbb'},
        {id: '3', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'ccc'},
      ] as Prose[];
      prepPrints(preparedPrints);
      removePrint(preparedPrints[1]);
      expect(prints.value).toStrictEqual([
        {id: '1', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'aaa'},
        {id: '3', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'ccc'},
      ])
    })
    it('removeAllPrints(): remove all prints', async ({ expect }) => {
      const preparedPrints = [
        {id: '1', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'aaa'},
        {id: '2', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'bbb'},
        {id: '3', poet: {id: "1"}, tags: 'الشجاعة', reviewed: true, qoute: 'ccc'},
      ] as Prose[];
      prepPrints(preparedPrints);
      removeAllPrints();
      expect(prints.value.length).toEqual(0);
    })
  })
}