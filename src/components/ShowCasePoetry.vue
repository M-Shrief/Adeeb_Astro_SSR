<template>
  <section id="chosen-verses">
    <h2 class="title">مختارات شعرية</h2>
    <div :class="routeName == 'main' ? 'grid-main' : 'grid-poet'">
      <div v-for="chosenVerse in chosenVerses" :key="chosenVerse.id"
        class="poetry-item">
        <div v-for="verse, index in chosenVerse.verses" :key="index"
          :class="chosenVerse.verses.length == 1 ? 'one-verse' : 'two-verse'">
          <p class="first">{{ verse.first }}</p>
          <p class="sec" dir="ltr">{{ verse.sec }}</p>
        </div>
        <a :href="'/poem/' + chosenVerse.poem.id" class="details">{{
          routeName == 'poet'
          ? 'القصيدة الكاملة'
          : chosenVerse.poet.name + ' - القصيدة الكاملة'
        }}</a>
        <button
          @click="addPrint({ id: chosenVerse.id, verses: chosenVerse.verses })"
          class="print-button">
          اضف للطباعة
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Stores
import {appStore} from '../stores/index'
import {usePrintsStore} from '../stores/prints'
// types
import type { ChosenVerse, Print } from '../stores/__types__';

defineProps<{
  chosenVerses: ChosenVerse[],
  routeName?: string
}>()


const printsStore = usePrintsStore(appStore);
function addPrint(print: Print) {
  return printsStore.addPrint(print);
}

// defineEmits(['print'])
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface2);

.title {
  text-align: center;
  background-color: $secondaryColor;
  color: $mainColor;
  padding: 0.3rem;
  margin: 1rem 0.3rem 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0.6rem 0.3rem 0;
    font-size: 1.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0.5rem 0.2rem 0;
    font-size: 1.2rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    margin: 0.3rem 0.1rem 0;
    font-size: 1rem;
  }
}

.grid-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @include mQ($breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-poet {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @include mQ($breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.poetry-item {
  position: relative;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  padding: 0.3rem;
  padding-bottom: 1.5rem;
  margin: 0.5rem;
  background: $secondaryColor;
  color: $mainColor;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    padding-bottom: 1.4rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    padding-bottom: 1.2rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    padding-bottom: 1rem;
    margin: 0.2rem;
  }

  .details {
    text-decoration: none;
    position: absolute;
    bottom: 0.7rem;
    right: 0.7rem;
    color: $mainColor;
    font-size: 0.9rem;

    &:hover {
      font-weight: 600;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.6rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.5rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.4rem;
    }
  }

  .one-verse {
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 1rem;

    .first {
      margin-right: 0.4rem;
    }

    .sec {
      margin-left: 0.4rem;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.95rem;
      margin-top: 1.2rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }

  .two-verse {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;

    .first {
      margin-right: 0.4rem;
    }

    .sec {
      margin-left: 0.4rem;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.95rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.8rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
    }
  }

  .print-button {
    @include add-print-btn;
  }
}
</style>
