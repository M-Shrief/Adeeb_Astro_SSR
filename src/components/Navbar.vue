<template>
  <!-- Navigation Raws -->
  <nav id="nav-raw" dir="rtl">
    <a href="/" id="logo">أديب</a>
    <div class="nav-row-group">
      <a :href="getPartner ? '/partners/ordering' : '/ordering'"
        class="nav-item" active-class="active">طلباتك</a>
      <a :href="getPartner ? '/partners/history' : '/history'"
        class="nav-item" active-class="active">مراجعة
        الطلبات</a>
      <a :href="'/about'" class="nav-item"
        active-class="active">قصتنا</a>

      <span v-if="getPartner" class="partner-name">{{ getPartner.name }}</span>
      <span v-if="getPartner" class="nav-item" @click="logout">تسجيل
        الخروج</span>
      <a href="/partners/auth" class="nav-item" active-class="active" v-else >كن
        شريكاً</a>
      <slot name="theme-switch" />
    </div>
  </nav>
</template>

<script lang="ts" setup>
// Stores
import { getPartner, logout } from '../stores/partners';
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

#nav-raw {
  display: flex;
  flex-direction: row;
  background-color: #1f2124;
  justify-content: space-between;

  #logo {
    color: rgba($color: #f6b352, $alpha: .8);
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 700;
    padding: 0.2rem 0.4rem;
    margin: 0.4rem;

    &:hover {
      color: #f6b352;
    }

    @include mQ($breakpoint-sm) {
      font-size: 1rem;
      padding: 0.1rem 0.2rem;
      margin: 0.1rem;
    }
  }

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

      &.active {
        background-color: $mainColor;
        color: #2c3e50;
        border-radius: 1rem;
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
}
</style>