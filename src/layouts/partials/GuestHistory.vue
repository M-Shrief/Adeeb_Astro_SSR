<template>
    <main >
      <h2>{{ui[currentLocale].history.h2 }}</h2>
  
      <Form @submit="onSubmit" >

        <div class="container">
          <label for="name">{{ui[currentLocale].history.name }}: </label>
          <Field name="name" id="name" autocomplete="name"  :rules="nameRules" />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="container">
          <label for="phone">{{ui[currentLocale].history.phone }}: </label>
          <Field name="phone" id="phone" autocomplete="phone" :rules="phoneRules" />
          <ErrorMessage name="phone" class="error" />
        </div>
  
        <button type="submit">{{ui[currentLocale].history.submit }}</button>
      </Form>
  
      <div v-for="order in getOrders" :key="order.id" class="order">
        <div class="order-details">
          <div>
            <p>{{ui[currentLocale].history.name }}</p><span>{{ order.name }}</span>
          </div>
          <div>
            <p>{{ui[currentLocale].history.phone }}</p><span>{{ order.phone }}</span>
          </div>
          <div>
            <p>{{ui[currentLocale].history.address }}</p><span>{{ order.address }}</span>
          </div>
          <div>
            <p>{{ui[currentLocale].history.orderDate }}</p><span>{{ order.created_at?.slice(0, 10) }}</span>
          </div>
          <p><span>{{ order.reviewed ? ui[currentLocale].history.reviewed  : ui[currentLocale].history.notReviewed }}</span></p>
          <p><span>{{ order.completed ? ui[currentLocale].history.completed : ui[currentLocale].history.notCompleted }}</span>
          </p>
        </div>
        <div class="order-products">
          <div v-for="product, index in order.products as Product[]" :key="index"
            class="product"
            :style="{ color: product.fontColor, background: product.backgroundColor }">
            <p>{{ui[currentLocale].history.fontType}}: {{ product.fontType }}</p>
            <p v-if="product.print.verses">{{ product.print.verses[0].first }}...
            </p>
            <p v-else-if="product.print.qoute">
              {{ product.print.qoute.slice(0, 30) }}...</p>
          </div>
        </div>
      </div>
  
    </main>
  </template>
  
<script lang="ts" setup>
  // Validation
  import {Form, Field, ErrorMessage} from 'vee-validate';
  import {nameRules, phoneRules} from '../../utils/forms.schema'
  // Stores
  import { getOrders, fetchOrders } from "../../stores/orders";
  // Types
  import type { Product } from '../../stores/__types__';
  // utils 
  import {ui} from '../../i18n/ui'


  async function onSubmit(values: any) {
    const {name, phone} = values
    await fetchOrders(name, phone);
  }

  defineProps<{
    currentLocale: keyof typeof ui;
  }>()
  </script>
  
  <style lang="scss" scoped>
  @import '../../assets/mixins.scss';
  
  $mainColor: var(--text1);
  $secondaryColor: var(--surface2);
  $inputsColor: var(--surface1);
  
  
  h2 {
    text-align: center;
  }
  
  
  form {
    color: $mainColor;
    background-color: $secondaryColor;
    margin: 1rem;
    border-radius: 1.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    .container {
      padding: 0.5rem;
      margin-right: 0.2rem;
      margin-top: 0.4rem;
  
      #name,
      #phone {
        background: $inputsColor;
        color: $mainColor;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 8px;
      }

      .error {
        color: #c80815;
        margin-right: 1rem;
      }
    }
  
    button {
      position: relative;
      width: 15%;
      margin: 0 auto;
      @include submit-btn
    }
  
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
  
      // p {
      //   margin: 0.5rem;
      // }
      p {
        margin: 0.5rem;
        @include mQ($breakpoint-md) {
          font-size: 1rem;
        }
        @include mQ($breakpoint-sm) {
          font-size: 0.8rem;
        }
      }
  
      span {
        font-weight: 600;
        @include mQ($breakpoint-md) {
          font-size: 9rem;
        }
        @include mQ($breakpoint-sm) {
          font-size: 0.7rem;
        }
      }
    }
  
    .order-products {
      padding: 0.4rem 0;
  
      .product {
        position: relative;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        padding: 0.2rem;
        margin: 0.3rem 2rem;
        border-radius: 1.5rem;
        border: 1px solid $mainColor;
        @include mQ($breakpoint-md) {
          padding: 0.15rem;  
        }
        @include mQ($breakpoint-sm) {
          padding: 0.1rem;  
        }

        p {
          margin: 0 0.6rem;  
          @include mQ($breakpoint-md) {
            font-size: 0.8rem;
          }
          @include mQ($breakpoint-sm) {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
  </style>