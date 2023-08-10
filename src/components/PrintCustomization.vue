<template>
  <div id="customization">
    <div class="select">
      <label for="fontType">اسلوب الخط</label>
      <select name="fontType" id="fontType">
        <option value="نسخ">نسخ</option>
        <option value="رقعة">رقعة</option>
        <option value="ديواني">ديواني</option>
      </select>
    </div>
    <PreviewColors :colors="colors"
      @color="(color: string) => $emit('fontColor', color)">الخط:
    </PreviewColors>
    <PreviewColors :colors="colors"
      @color="(color: string) => $emit('backgroundColor', color)">الخلفية:
    </PreviewColors>
  </div>
</template>

<script lang="ts" setup>
// Stores
import {appStore} from '../stores/index'
import {useOrderStore} from '../stores/orders'
// components
import PreviewColors from "./PreviewColors.vue";

const ordersStore = useOrderStore(appStore);
const colors = ordersStore.colors


defineEmits(['fontColor', 'backgroundColor']);
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

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
      margin-top: 0.25rem;
      border-radius: 1rem;
      background-color: var(--text1);
      color: var(--surface2);
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
</style>