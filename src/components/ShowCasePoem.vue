<template>
  <section v-if="verses" dir="rtl" id="poem">
    <div v-for="verse, index in verses" :key="index" class="verse"
      @dblclick="printsActions.add({ id: verse.first.slice(0, 5), verses: [{ first: verse.first, sec: verse.sec }] })">
      <p class="first">{{ verse.first }}</p>
      <p class="sec" dir="ltr">{{ verse.sec }}</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
// stores
import { actions as printsActions } from '../stores/prints';
// Types
import type { Verse } from '../stores/__types__';

defineProps<{
  verses: Verse[]
}>();
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface2);

#poem {
  position: relative;
  color: $mainColor;
  background: $secondaryColor;
  border-radius: 1.5rem;
  padding: 0.7rem;
  margin: 0 0.7rem;
  overflow: visible;

  @include mQ($breakpoint-lg) {
    padding: 0.6rem;
    margin: 0 0.6rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.5rem;
    margin: 0 0.5rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.3rem;
    margin: 0 0.3rem;
  }

  .verse {
    font-size: 1.2rem;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;

    .first {
      margin-right: 0.4rem;
    }

    .sec {
      margin-left: 0.4rem;
    }

    &:hover {
      font-weight: 600;
    }

    @include mQ($breakpoint-md) {
      font-size: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      .first {
        margin-right: 0.2rem;
      }

      .sec {
        margin-left: 0.2rem;
      }
    }
  }
}
</style>