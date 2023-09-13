<template>
    <div class="nav-row-group">
      <a :href="getPartner ? '/partners/ordering' : '/ordering'"
        class="nav-item" >طلباتك</a>
      <a :href="getPartner ? '/partners/history' : '/history'"
        class="nav-item" >مراجعة
        الطلبات</a>
      <a :href="'/about'" class="nav-item"
        >قصتنا</a>

      <span v-if="getPartner" class="partner-name">{{ getPartner.name }}</span>
      <span v-if="getPartner" class="nav-item" @click="logout">تسجيل
        الخروج</span>
      <a href="/partners/auth" class="nav-item"  v-else >كن
        شريكاً</a>
    </div>
</template>

<script lang="ts" setup>
// Stores
import { onMounted } from 'vue';
import { getPartner, logout } from '../stores/partners';

const props = defineProps<{
  activeUrl: string; 
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