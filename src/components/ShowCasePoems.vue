<template>
  <section id="poems">
    <!--
      Add a link to Poems page that shows all poems with pagination 
      opposite colors for the slot
    -->
    <slot />
    <div :class="grid">
      <a v-for="poem in poems" :key="poem.id"
        :href="`/poem/${poem.id}`" class="poem" replace>
        <!-- for Main & Poem pages -->
        <p v-if="poem.poet">{{ poem.intro }} - {{ poem.poet.name }}</p>
        <!-- for Poet's Page -->
        <p v-else>{{ poem.intro }}..</p>
    </a>
    </div>
  </section>
</template>

<script setup lang="ts">
// types
import type { Poem } from '../stores/__types__';

defineProps<{
  poems: Poem[],
  // Don't put in {poet, poem} pages
  grid?: string
}>()
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface3);


#poems {
  padding: 0.3rem;
  border-radius: 2rem;
  margin: 0 1rem;
  background-color: $secondaryColor;

  .poem {
    // color: rgba($color: $mainColor, $alpha: .8);
    color: $mainColor;
    text-decoration: none;
    font-size: 1.1rem;

    &:hover {
      font-weight: 700;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@include mQ($breakpoint-lg) {
  #poems {
    padding: 0.4rem;
    margin: 0 0.7rem;

    .poem {
      font-size: 1rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include mQ($breakpoint-md) {
  #poems {
    padding: 0.3rem;
    margin: 0 0.6rem;

    .poem {
      font-size: 0.9rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include mQ($breakpoint-sm) {
  #poems {
    padding: 0.2rem;
    margin: 0 0.4rem;

    .poem {
      font-size: 0.8rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
