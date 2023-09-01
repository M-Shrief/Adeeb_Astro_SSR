<template>
    <main >
      <h2>ادخل بيانات الطلب لمتابعته</h2>
  
      <Form @submit="onSubmit" >

        <div class="container">
          <label for="name">الاسم: </label>
          <Field name="name" id="name" autocomplete="name"  :rules="nameRules" />
          <ErrorMessage name="name" class="error" />
        </div>
        <div class="container">
          <label for="phone">الهاتف: </label>
          <Field name="phone" id="phone" autocomplete="phone" :rules="phoneRules" />
          <ErrorMessage name="phone" class="error" />
        </div>
  
        <button type="submit">تأكـيد</button>
      </Form>
  
      <div v-for="order in getOrders" :key="order.id" class="order">
        <div class="order-details">
          <div>
            <p>الاسم</p><span>{{ order.name }}</span>
          </div>
          <div>
            <p>الهاتف</p><span>{{ order.phone }}</span>
          </div>
          <div>
            <p>العنوان</p><span>{{ order.address }}</span>
          </div>
          <div>
            <p>تاريخ الطلب</p><span>{{ order.createdAt?.slice(0, 10) }}</span>
          </div>
          <p><span>{{ order.reviewed ? 'تمت المراجعة' : 'غير مراجع' }}</span></p>
          <p><span>{{ order.completed ? 'تم التسليم' : 'لم يتم التسليم' }}</span>
          </p>
        </div>
        <div class="order-products">
          <div v-for="product, index in order.products as Product[]" :key="index"
            class="product"
            :style="{ color: product.fontColor, background: product.backgroundColor }">
            <p>نوع الخط: {{ product.fontType }}</p>
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
  import {nameRules, phoneRules} from '../utils/forms.schema'
  // Stores
  import { getOrders, fetchOrders } from "../stores/orders";
  // Types
  import type { Product } from '../stores/__types__';

  async function onSubmit(values: any) {
    const {name, phone} = values
    await fetchOrders(name, phone);
  }
  </script>
  
  <style lang="scss" scoped>
  @import '../assets/mixins.scss';
  
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
  
    select {
      padding: 0.2rem;
      margin-right: 0.5rem;
    }
  
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
      right: 50%;
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
  
      p {
        margin: 0.5rem;
      }
  
      span {
        font-weight: 600;
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
  
        p {
          margin: 0 0.6rem;
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
  
    }
  }
  </style>