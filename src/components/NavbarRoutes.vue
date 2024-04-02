<template>
    <!-- Ordering page -->
    <a v-if="isPartner" :href="`${i18nPrefix}/partners/ordering`"
      class="nav-item" >{{ui[currentLocale].nav.ordering}}</a>
    <a v-else :href="`${i18nPrefix}/ordering`"
      class="nav-item" >{{ui[currentLocale].nav.ordering}}</a>

    <!-- History page -->
    <a v-if="isPartner" :href="`${i18nPrefix}/partners/history`"
      class="nav-item" >{{ui[currentLocale].nav.history}}</a>
    <a v-else :href="`${i18nPrefix}/history`"
      class="nav-item" >{{ui[currentLocale].nav.history}}</a>
      
    <!-- About page -->
    <a :href="`${i18nPrefix}/about`" class="nav-item">
      {{ui[currentLocale].nav.about}}
    </a>

    <!-- Partner name and logout -->
    <span v-if="getPartner" class="partner-name">{{ getPartner.name }}</span>
    <span v-if="isPartner" class="nav-item" @click="partnerActions.logout">{{ui[currentLocale].nav.logout}}</span>
    <!-- Partner's auth page -->
    <a :href="`${i18nPrefix}/partners/auth`"
    class="nav-item" data-astro-prefetch v-else >{{ui[currentLocale].nav.partnership}}</a>
</template>

<script lang="ts" setup>
// Stores
import { onMounted } from 'vue';
import { getPartner, actions as partnerActions, isPartner } from '../stores/partners';
// UI
import {defaultLang, ui} from '../i18n/ui'
import { getI18nPrefix } from '../i18n/utils';

const props = defineProps<{
  activeUrl: string; 
  currentLocale: keyof typeof ui;
}>()

onMounted(() => {
  let url: string;
  if(props.activeUrl.endsWith('/')) {
    url = props.activeUrl.slice(0, props.activeUrl.length - 1);
  } 
  else url = props.activeUrl;

  const activeLink = document.querySelector(`a[href*='${url}']`);

  if(activeLink) activeLink.classList.add('active')}
)

const i18nPrefix = getI18nPrefix(props.currentLocale);
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

    $mainColor: #FBE6C2;

    .nav-item {
      padding: 0.2rem 0.4rem;
      margin: 0.4rem;
      color: rgba($color: $mainColor, $alpha: 0.8);
      font-size: 1.2rem;
      text-decoration: none;

      &:hover {
        color: $mainColor;
      }
      @include mQ($breakpoint-md) {
        font-size: 1rem;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
        display: block;
      }
      @include mQ($breakpoint-sm) {
        font-size: 0.75rem;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
        display: block;
      }
    }

    .active {
      background-color: $mainColor;
      color: #2c3e50;
      border-radius: 1rem;
      &:hover {
        color: #2c3e50;
      }
    }

    .partner-name {
      background-color: $mainColor;
      color: #2c3e50;
      border-radius: 1rem;
      padding: 0.2rem 0.4rem;
      margin: 0.4rem;
      font-size: 1rem;

      @include mQ($breakpoint-md) {
        font-size: 1rem;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
        display: block;
      }
      @include mQ($breakpoint-sm) {
        font-size: 0.75rem;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
        display: block;
      }
    }
</style>