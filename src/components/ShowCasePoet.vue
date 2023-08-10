<template>
  <section v-if="details" class="poet" dir="rtl">
    <h2>{{ details.name }} - {{ details.time_period }}</h2>
    <p class="bio">{{ details.bio }}</p>
  </section>
</template>

<script lang="ts" setup>

defineProps<{
  details: {
    name: string;
    time_period: string;
    bio: string;
  };
}>()
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface3);

.poet {
  position: relative;
  color: $mainColor;
  font-weight: 500;
  background: $secondaryColor;
  box-shadow: 0 5px 10px rgba($color: $mainColor, $alpha: .4);
  border-radius: 1rem;
  padding: 0.8rem;
  margin: 0.7rem 0.3rem;
  overflow: visible;

  .bio {
    font-size: 1.2rem;
  }

  @include mQ($breakpoint-lg) {
    padding: 0.5rem;
    margin: 0.5rem 0.2rem;

    h2 {
      font-size: 1.2rem;
    }

    .bio {
      font-size: 1rem;
    }
  }

  @include mQ($breakpoint-md) {
    padding: 0.5rem;
    margin: 0.5rem 0.2rem;

    h2 {
      font-size: 1rem;
    }

    .bio {
      font-size: 0.9rem;
    }
  }

  @include mQ($breakpoint-sm) {
    padding: 0.3rem;
    margin: 0.3rem 0.1rem;

    h2 {
      font-size: 1rem;
    }

    .bio {
      font-size: 0.9rem;
    }
  }
}
</style>