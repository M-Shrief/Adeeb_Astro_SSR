<template>
  <section id="history">
    <h3 v-if="getPartner">{{ui[currentLocale].partners.history.h3}}</h3>
    <div v-if="getOrders" v-for="order in getOrders" :key="order.id"
      class="order">
      <div class="order-details">
        <div>
          <p>{{ui[currentLocale].partners.history.address}}</p><span>{{ order.address }}</span>
        </div>
        <div>
          <p>{{ui[currentLocale].partners.history.orderDate}}</p><span>{{ order.created_at?.slice(0, 10) }}</span>
        </div>
        <p><span>{{ order.reviewed ? ui[currentLocale].partners.history.reviewed : ui[currentLocale].partners.history.notReviewed }}</span></p>
        <p><span>{{ order.completed ? ui[currentLocale].partners.history.completed : ui[currentLocale].partners.history.notCompleted }}</span>
        </p>
      </div>
      <div class="order-products">
        <div v-for="productGroup, index in order.products as ProductGroup[]"
          :key="index">
          <div class="group-details"
            :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }">
            <p>{{ ui[currentLocale].partners.history.fontType }}: {{ productGroup.fontType }} </p>
            <p v-if="productGroup.prints">{{ productGroup.prints.length }}
              {{ui[currentLocale].partners.history.prints}}</p>
          </div>
          <div class="group-prints">
            <div v-for="print in productGroup.prints" :key="print.id"
              class="group-print"
              :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }">
              <p v-if="print.verses"> {{ print.verses[0].first }}...</p>
              <p v-else-if="print.qoute"> {{ print.qoute.slice(0, 30) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Only show for authenticated Partners
import { onMounted } from 'vue';
// Stores
import { getOrders, fetchPartnerOrders } from "../../stores/orders";
import { getPartner } from '../../stores/partners';
// types
import type { ProductGroup } from '../../stores/__types__'
// UI
import { ui } from '../../i18n/ui'

defineProps<{
  currentLocale: keyof typeof ui;
}>()

onMounted(() => {
  fetchPartnerOrders();
})

</script>

<style lang="scss" scoped>
@import '../../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface2);


h3 {
  text-align: center;
  font-size: 2rem;
}

.order {
  color: $mainColor;
  background: $secondaryColor;
  margin: 1rem;
  border-radius: 1.5rem;

  .order-details {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 1rem;

    p {
      margin: 0.5rem;
    }

    span {
      font-weight: 600;
    }
  }

  .order-products {
    padding: 0.4rem 0;

    .group-details,
    .group-print {
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      padding: 0.2rem;
      margin: 0.3rem 2rem;
      border-radius: 1.5rem;
      border: 1px solid $mainColor;

      p {
        margin: 0 0.6rem;
        font-weight: 600;
      }

      @include mQ($breakpoint-md) {
        padding: 0.15rem;
        margin: 0.15rem;

        p {
          font-size: 0.8rem;
        }
      }

      @include mQ($breakpoint-sm) {
        padding: 0.1rem;
        margin: 0.1rem;

        p {
          font-size: 0.7rem;
        }
      }
    }

    .group-prints {
      font-size: 0.8rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>