<template>
  <section id="poets">
    <slot />
    <div class="grid">
      <a v-for="poet in poets" :key="poet.id"
      :href="currentLocale == defaultLang ? `/poet/${poet.id}`: `/${currentLocale}/poet/${poet.id}`"
        class="poet" replace>
        <p>{{ poet.name }}</p>
    </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
// types
import type { Poet } from '../stores/__types__';
// UI
import {defaultLang, ui} from '../i18n/ui'

defineProps<{
  poets: Poet[];
  currentLocale: keyof typeof ui;
}>()

</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface2);

#poets {
  background-color: $secondaryColor;
  padding: 0.3rem;
  border-radius: 1rem;
  margin: 0 1rem;
  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0 0.6rem;
  }
  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0 0.5rem;
  }
  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    margin: 0 0.3rem; 
  }

  .poet {
    color: $mainColor;
    text-decoration: none;
    font-size: 1.1rem;
    margin: 0.3rem;
    text-align: center;
    &:hover {
      font-weight: 700;
    }
    @include mQ($breakpoint-lg) {
      font-size: 1rem;
      margin: 0.3rem;
    }
    @include mQ($breakpoint-md) {
      font-size: 0.9rem;
      margin: 0.2rem;
    }
    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      margin: 0.1rem auto;
    }

  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include mQ($breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mQ($breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mQ($breakpoint-sm) {

      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
