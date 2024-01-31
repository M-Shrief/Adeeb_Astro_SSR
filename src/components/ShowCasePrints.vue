<template>
  <div v-for="print in prints" :key="print.id" class="print-item"
    :style="{ color: fontColor, background: backgroundColor, border: `1px solid ${fontColor}` }">
    <!-- Assigning poetry(2verses) || poetry(1verse) or prose -->
    <div @click="$emit('print', print)">
      <!-- if selected from ShowCasePoetry -->
      <div v-if="print.verses" v-for="verse, index in print.verses" :key="index"
        class="verse" dir="rtl">
        <p >{{ verse.first }}</p>
        <p dir="ltr">{{ verse.sec }}</p>
      </div>
      <!-- if selected from  ShowCaseProse -->
      <div v-else-if="print.qoute" class="qoute">
        <p dir="rtl">{{ print.qoute }}</p>
      </div>
    </div>
    <button :style="{ color: backgroundColor, background: fontColor }"
      @click="$emit('remove', print)">X</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, type ComputedRef } from 'vue';
// types
import type { Print } from '../stores/__types__';

const props = defineProps<{
  prints: Print[],
  colors?: ComputedRef<string>[]
}>()

let fontColor = ref<ComputedRef<string> | string>(props.colors ? props.colors[0] : 'auto');
let backgroundColor = ref<ComputedRef<string> | string>(props.colors ? props.colors[1] : 'auto');


defineEmits(['print', 'remove'])
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface2);

.print-item {
  color: $mainColor;
  border: 1px solid $mainColor;
  position: relative;
  list-style: none;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.5rem;
  @include mQ($breakpoint-md) {
    padding: 0.5rem;
    margin: 0.5rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.3rem;
    margin: 0.3rem;
  }


  .verse,
  .qoute {
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
    padding-top: 1rem;
    text-align: center;
    @include mQ($breakpoint-md) {
      padding-top: 0.5rem;
    }
    @include mQ($breakpoint-sm) {
      padding-top: 0.3rem;
    }
  }

  button {
    color: $secondaryColor;
    background-color: $mainColor;
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
    padding: 0.4rem;
    border: none;
    border-radius: 0.7rem;
    cursor: pointer;

    @include mQ($breakpoint-md) {
      padding: 0.3rem;
    }

    @include mQ($breakpoint-sm) {
      padding: 0.1rem 0.2rem;
    }
  }
}
</style>