<template>
    <div class="nav-row-group">   
      <!-- Ordering page -->
      <a v-if="isPartner" :href="currentLocale == defaultLang ? '/partners/ordering': `/${currentLocale}/partners/ordering`"
        class="nav-item" >{{t('nav').ordering}}</a>
      <a v-else :href="currentLocale == defaultLang ? '/ordering' : `/${currentLocale}/ordering`"
        class="nav-item" >{{t('nav').ordering}}</a>

      <!-- History page -->
      <a v-if="isPartner" :href="currentLocale == defaultLang ? '/partners/history': `/${currentLocale}/partners/history`"
        class="nav-item" >{{t('nav').history}}</a>
      <a v-else :href="currentLocale == defaultLang ? '/history' : `/${currentLocale}/history`"
        class="nav-item" >{{t('nav').history}}</a>
        
      <!-- About page -->
      <a :href="currentLocale == defaultLang ? '/about' : `/${currentLocale}/about`" class="nav-item"        >{{t('nav').about}}</a>

      <!-- Partner name and logout -->
      <span v-if="getPartner" class="partner-name">{{ getPartner.name }}</span>
      <span v-if="isPartner" class="nav-item" @click="partnerActions.logout">{{t('nav').logout}}</span>
      <!-- Partner's auth page -->
      <a href="/partners/auth" class="nav-item" data-astro-prefetch v-else >{{t('nav').partnership}}</a>
    </div>
</template>

<script lang="ts" setup>
// Stores
import { onMounted } from 'vue';
import { getPartner, actions as partnerActions, isPartner } from '../stores/partners';
// utils
import {useTranslations} from '../i18n/utils'
import {defaultLang, ui} from '../i18n/ui'

const props = defineProps<{
  activeUrl: string; 
  currentLocale: keyof typeof ui;
}>()

const t = useTranslations(props.currentLocale);

onMounted(() => {
  let url: string;
  if(props.activeUrl.endsWith('/')) {
    url = props.activeUrl.slice(0, props.activeUrl.length - 1);
  } 
  else url = props.activeUrl;

  const activeLink = document.querySelector(`a[href*='${url}']`);

  if(activeLink) activeLink.classList.add('active')}
)
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

  .nav-row-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

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

      @include mQ($breakpoint-sm) {
        font-size: 0.8rem;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
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

      @include mQ($breakpoint-sm) {
        font-size: 0.8rem;
        padding: 0.1rem 0.2rem;
        margin: 0.1rem;
      }
    }
  }
</style>