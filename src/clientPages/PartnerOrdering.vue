<template>
  <section id="prep-order">
    <h3 v-if="!isPartner">{{ ui[currentLocale].partners.ordering.noSignupOrder }}</h3>
    <div class="prep-prints">
      <p>{{ ui[currentLocale].partners.ordering.p }}</p>
      <div class="prep">
        <div>
          <label for="poetry">{{ ui[currentLocale].partners.ordering.poetry }}: </label>
          <input type="number" name="poetry" id="poetry" value="5" min="1" max="10">
        </div>
        <button type="submit" @click="preparePoetry">{{ ui[currentLocale].partners.ordering.prep }}</button>
      </div>

      <div class="prep">
        <div>
          <label for="prose">{{ ui[currentLocale].partners.ordering.prose }}: </label>
          <input type="number" name="prose" id="prose" value="5" min="1" max="10">
        </div>
        <button type="submit" @click="prepareProse">{{ ui[currentLocale].partners.ordering.prep }}</button>
      </div>
    </div>
    <PrintCustomization :colors="colors" :current-locale="currentLocale"
      @fontColor="(color: string) => fontColor = color"
      @backgroundColor="(color: string) => backgroundColor = color">
    </PrintCustomization>

    <div class="preview-prints">
      <ShowCasePrints :prints="getPrints"
        :colors="[computed(() => fontColor as string), computed(() => backgroundColor as string)]"
        @remove="(print: Print) => printsActions.remove(print)" />
    </div>
    <button @click="onAddProductGroup(getPrints, [fontColor, backgroundColor])">{{ ui[currentLocale].partners.ordering.addOrders }}</button>
  </section>
  <OrderForm :current-locale="currentLocale" :productGroups="getProductGroups" :partner="getPartner" @partner-order="(order: Order) => onPartnerOrder(order)" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
// components
import PrintCustomization from '../components/PrintCustomization.vue';
import ShowCasePrints from '../components/ShowCasePrints.vue';
import OrderForm from '../components/OrderForm.vue';
// stores
import { fetchRandomChosenVerses, getRandomChosenVerses } from "../stores/chosenVerses";
import { fetchRandomProses, getRandomProses } from "../stores/proses";
import { getPrints, actions as printsActions } from "../stores/prints";
import { getPartner, isPartner } from '../stores/partners';
import { colors, getProductGroups, addProductGroup, newPartnerOrder, reset } from "../stores/orders";
// types
import type { Order, Print } from '../stores/__types__'
// UI
import { ui } from '../i18n/ui'

defineProps<{
  currentLocale: keyof typeof ui;
}>()


let fontColor = ref(colors[0]);
let backgroundColor = ref(colors[1]);


function onAddProductGroup(prints: Print[], colors: string[]) {
  if (prints.length != 0) {
    addProductGroup(prints, colors);
  }
  // empty prints store
  printsActions.removeAll();
}

const onPartnerOrder = async (order: Order) => {
  await newPartnerOrder(order)
  reset()
}



async function preparePoetry() {
  const num = (document.getElementById('poetry') as HTMLInputElement).valueAsNumber;
  await fetchRandomChosenVerses(num).then((res) => {
    printsActions.prep(getRandomChosenVerses.value);
  });
}
async function prepareProse() {
  const num = (document.getElementById('prose') as HTMLInputElement).valueAsNumber;
  await fetchRandomProses(num).then(() => {
    printsActions.prep(getRandomProses.value);
  });
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

#prep-order {
  $mainColor: var(--text1);
  $secondaryColor: var(--surface2);
  ////////////
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: $mainColor;
  background-color: $secondaryColor;
  padding: 0.3rem;
  margin: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0.6rem 0.4rem 0;
    font-size: 1.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0.5rem 0.3rem 0;
    font-size: 1.2rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    margin: 0.3rem 0.1rem 0;
    font-size: 1rem;
  }


  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem;
  }

  .prep-prints {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    input {
      outline: 1px solid $mainColor;
      border: none;
      background: $mainColor;
      color: $secondaryColor;
      border-radius: 0.2rem;
    }
    .prep {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 1rem;
      button {
        margin: 0.5rem;
      }
    }
  }

  // PrintCustomization
  #customization {
    width: 70%;
    margin: 0 auto;
  }

  button {
    @include submit-btn
  }
}


.preview-prints {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
}
</style>