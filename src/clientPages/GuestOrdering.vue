<template>
  <main id="printing">
    <div class="container">
      <section id="preview">
        <h3>اختر من الاشعار للطباعة</h3>
        <PrintCustomization :colors="colors"
          @fontColor="(color: string) => fontColor = color"
          @backgroundColor="(color: string) => backgroundColor = color" />
        <div v-if="preview.verses" v-for="verse, index in preview.verses"
          :key="index" class="verse" id="print"
          :style="{ color: fontColor, background: backgroundColor }">
          <p>{{ verse.first }}</p>
          <p dir="ltr">{{ verse.sec }}</p>
        </div>
        <div v-else-if="preview.qoute" class="qoute" id="print"
          :style="{ color: fontColor, background: backgroundColor }">
          <p>{{ preview.qoute }}</p>
        </div>
        <button @click="addProduct(preview, [fontColor, backgroundColor])">اضافة
          الطلب</button>
        <div>
        </div>
      </section>
      <OrderForm :products="getProducts" @guest-order="(order: Order) => onGuestOrder(order)"/>
    </div>

    <section id="prints">
      <h3>المختار للطباعة</h3>
      <div id="randoms">
        <div id="buttons">
          <button @click="getRandomPoetry(1)">شعر عشوائي</button>
          <button @click="getRandomProse(1)">نثر عشوائي</button>
        </div>
        <div v-if="randomPrint">
          <div @click="preview = randomPrint">
            <div v-if="randomPrint.verses" v-for="verse,index in randomPrint.verses"
              :key="index" class="verse">
              <p>{{ verse.first }}</p>
              <p dir="ltr">{{ verse.sec }}</p>
            </div>
            <div v-else-if="randomPrint.qoute" class="qoute">
              <p>{{ randomPrint.qoute }}</p>
            </div>
          </div>
        </div>
      </div>
      <ShowCasePrints :prints="getPrints" @remove="(print) => printActions.remove(print)"
        @print="(print: Print) => preview = print" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// stores
import { getPrints, actions as printActions } from "../stores/prints";
import { getRandomChosenVerses, fetchRandomChosenVerses } from "../stores/chosenVerses";
import { getRandomProses, fetchRandomProses } from "../stores/proses";
import { colors, newGuestOrder, reset, getProducts, addProduct } from '../stores/orders';
// components
import PrintCustomization from '../components/PrintCustomization.vue';
import OrderForm from "../components/OrderForm.vue";
import ShowCasePrints from '../components/ShowCasePrints.vue';
// Types
import type { Order,Prose, ChosenVerse, Print } from '../stores/__types__';

let preview = ref({} as Print);
let randomPrint = ref();

let fontColor = ref(colors[0]);
let backgroundColor = ref(colors[1]);

const onGuestOrder = async (order: Order) => {
  await newGuestOrder(order);
  reset();
  window.location.href = '/history/';
}

function getRandomPoetry(num: number) {
  fetchRandomChosenVerses(num);
  randomPrint.value = getRandomChosenVerses.value[0];
}

function getRandomProse(num: number) {
  fetchRandomProses(num);
  randomPrint.value = getRandomProses.value[0];
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';
$mainColor: var(--text1);
$secondaryColor: var(--surface2);

#printing {
  display: grid;
  grid-template-columns: 75% 25%;
  color: $mainColor;
  margin-top: 1rem;

  @include mQ($breakpoint-md) {
    grid-template-columns: 70% 30%;
  }

  h3 {
    text-align: center;

    @include mQ($breakpoint-md) {
      font-size: 1.1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 1rem;
    }
  }

  .container {
    min-height: 50vh;
  }

  #preview {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-radius: 1.5rem;
    background: $secondaryColor;

    .verse,
    .qoute {
      padding: 0 0.6rem;
      font-size: 1.6rem;
      width: 70%;
      margin: 0 auto;

      @include mQ($breakpoint-md) {
        font-size: 0.9rem;
      }

      @include mQ($breakpoint-sm) {
        font-size: 0.8rem;
      }
    }

    .qoute {
      text-align: center;
    }

    #customization {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 0.3rem;

      .select {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;

        select {
          border: none;
        }

        #fontType {
          margin-top: 0.3rem;
        }
      }

      @include mQ($breakpoint-md) {
        .select {
          padding: 0.3rem;
        }

        label {
          font-size: 0.9rem;
        }
      }

      @include mQ($breakpoint-sm) {
        .select {
          padding: 0.1rem;
        }

        label {
          font-size: 0.6rem;
        }
      }
    }

    button {
      margin: 0.5rem auto;
      @include submit-btn
    }

  }

  #prints {
    background: $secondaryColor;
    margin-left: 0.5rem;
    border-radius: 1rem;

    #randoms {
      color: $mainColor;
      border: 1px solid $mainColor;
      list-style: none;
      border-radius: 5px;
      padding: 0.5rem 0;
      margin: 0.5rem 0;

      .verse,
      .qoute {
        padding: 0 0.6rem;
        font-size: 1rem;
        font-weight: 400;
        @include mQ($breakpoint-md) {
          font-size: 0.7rem;
        }

        @include mQ($breakpoint-sm) {
          font-size: 0.6rem;
        }
      }

      .qoute {
        text-align: center;
      }

      #buttons {
        display: flex;
        justify-content: space-around;

        button {
          background: $mainColor;
          color: $secondaryColor;
          font-size: 1rem;
          font-weight: 400;
          padding: 0.4rem;
          border: none;
          border-radius: 0.7rem;
          cursor: pointer;

          @include mQ($breakpoint-md) {
            font-size: 0.7rem;
            padding: 0.15rem;
          }

          @include mQ($breakpoint-sm) {
            font-size: 0.6rem;
            padding: 0.1rem;
          }
        }
      }
    }
  }
}
</style>