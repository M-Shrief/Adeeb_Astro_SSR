<template>
  <div class="colors">
    <p>
      <slot />
    </p>
    <button v-for="color in colors" :key="color" :style="{ background: color }"
      class="color" @click="$emit('color', color)" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  colors: string[]
}>();

defineEmits(['color']);
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

.colors {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  p {
    @include mQ($breakpoint-md) {
      font-size: 0.9rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
    }
  }

  .color {
    padding: 0.5rem;
    margin: 0.3rem;
    border: 1px solid var(--text1);
    border-radius: 1rem;

    &:hover {
      padding: 0.6rem;
    }

    @include mQ($breakpoint-md) {
      padding: 0.4rem;
      margin: 0.2rem;

      &:hover {
        padding: 0.5rem;
      }
    }

    @include mQ($breakpoint-sm) {
      padding: 0.3rem;
      margin: 0.1rem;

      &:hover {
        padding: 0.4rem;
      }
    }
  }
}
</style>