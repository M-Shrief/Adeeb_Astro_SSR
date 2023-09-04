<template>
  <div id="selected-prints" >
    <p><a :href="isPartner ? '/partners/ordering' : '/ordering'"
        class="title">للطباعة</a> </p>
    <ul class="prints">
      <li class="prints-item" v-for="print in getPrints" :key="print.id"
        @dblclick="removePrint(print)">
        <!-- poetry -->
        <p v-if="print.verses">{{ print.verses[0].first }}..</p>
        <!-- prose -->
        <p v-else-if="print.qoute">{{ print.qoute.slice(0, 15) }}..</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {getPrints, removePrint} from '../stores/prints'
import { isPartner } from '../stores/partners';

</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--surface2);
$secondaryColor: var(--text1);

#selected-prints {
  position: fixed;
  bottom: 0.3rem;
  right: 0.9rem;
  display: flex;
  flex-direction: row;
  background: $secondaryColor;
  padding: 0.3rem 0.7rem;
  border-radius: 2rem;

  @include mQ($breakpoint-lg) {
    padding: 0.2rem 0.5rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem 0.4rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem 0.3rem;
  }

  .title {
    margin-left: 0.3rem;
    font-weight: 600;
    color: $mainColor;
    opacity: 85%;
    text-decoration: none;

    &:hover {
      opacity: 100%;
    }

    @include mQ($breakpoint-lg) {
      margin-left: 0.3rem;
      font-size: 1rem;
    }

    @include mQ($breakpoint-md) {
      margin-left: 0.2rem;
      font-size: 0.9rem;
    }

    @include mQ($breakpoint-sm) {
      margin-left: 0.1rem;
      font-size: 0.8rem;
    }
  }

  .prints {
    display: flex;
    flex-direction: row;
    list-style: none;

    .prints-item {
      padding: 0.2rem;
      margin-left: 0.3rem;
      background: $mainColor;
      color: $secondaryColor;
      cursor: pointer;

      p {
        display: none;
        padding: 0.25rem;
      }

      &:hover {
        p {
          display: inline;
          padding: 0rem;
          font-weight: 600;
        }
      }

      @include mQ($breakpoint-sm) {
        &:hover p {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
