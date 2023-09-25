<template>
  <Form @submit="onSubmit" dir="rtl">
    <div id="confirmation">
      <div id="customer-details" v-if="partner">
        <div class="container">
          <p>الاسم: {{ partner.name }}</p>
        </div>
        <div class="container">
          <p>الهاتف: {{ partner.phone }}</p>
        </div>
        <div class="container">
          <label for="address">العنوان: </label>
          <Field name="address" id="address" autocomplete="address"  :rules="addressRules" />
          <ErrorMessage name="address" class="error" />
        </div>
      </div>
      <div id="customer-details" v-else>
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
        <div class="container">
          <label for="address">العنوان: </label>
          <Field name="address" id="address" autocomplete="address" :rules="addressRules" />
          <ErrorMessage name="address" class="error" />
        </div>
      </div>
      <div class="errors">
      </div>


      <div id="products">
        <div v-for="product, index in products" class="product-details"
          :key="index"
          :style="{ color: product.fontColor, background: product.backgroundColor }"
          @dblclick="deleteProduct(index)">
          <p>{{ product.fontType }}</p>
          <p v-if="product.print.verses"> {{ product.print.verses[0].first
          }}...</p>
          <p v-else-if="product.print.qoute">
            {{ product.print.qoute.slice(0, 30) }}...</p>
        </div>
        <div v-for="productGroup, groupIndex in productGroups" :key="groupIndex">
          <div class="group-details"
            :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }">
            <p>نوع الخط: {{ productGroup.fontType }} </p>
            <p>{{ productGroup.prints.length }} طبعات</p>
          </div>
          <div class="group-prints">
            <div v-for="print, index in productGroup.prints" :key="index"
              class="group-print"
              :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }"
              @dblclick="deleteFromProductGroup(groupIndex, index)">
              <p v-if="print.verses"> {{ print.verses[0].first }}...</p>
              <p v-else-if="print.qoute"> {{ print.qoute.slice(0, 30) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="submit">تأكيد الطلب</button>
  </Form>
</template>

<script lang="ts" setup>
// Validation
import { Form, Field, ErrorMessage } from 'vee-validate';
import { nameRules, phoneRules, addressRules } from '../utils/forms.schema'
// types
import type { Product, Print, ProductGroup, Partner, Order } from '../stores/__types__';

const props = defineProps<{
  products?:  Array<Product>,
  partner?: Partner | null,
  productGroups?: Array<ProductGroup>,
}>();


function deleteProduct(index: number) {
  if(props.products) props.products.splice(index, 1);
}


// ProductGroup
function deleteFromProductGroup(groupIndex: number, index: number) {
  if(props.productGroups) {
    if (props.productGroups[groupIndex].prints.length == 1) {
      props.productGroups.splice(groupIndex, 1);
    } else {
      props.productGroups[groupIndex].prints.splice(index, 1);
    }
  }
}

const emits = defineEmits(['partnerOrder', 'guestOrder']);

async function onSubmit(values: any) {
  let order: Order;
  if (props.partner && props.productGroups) {
    order = {
      partnerId: props.partner.id,
      name: props.partner.name,
      phone: props.partner.phone,
      ...values,
      products: props.productGroups
    };
    emits('partnerOrder', order);
  } else {
    order = {
      ...values,
      products: props.products
    };
    emits('guestOrder', order);
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface2);
$inputsColor: var(--surface1);

form {
  background-color: $secondaryColor;
  margin: 1rem;
  border-radius: 1.5rem;
  padding: 0.5rem;

  #customer-details {
    color: $mainColor;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .container {
      font-size: 1.1rem;
      padding: 0.8rem;
      margin-right: 0.2rem;
      margin-top: 0.4rem;

      #name,
      #phone,
      #address {
        color: $mainColor;
        background: $inputsColor;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 1rem;
      }

      .error {
        color: #c80815;
        margin-right: 1rem;
      }
    }

    @include mQ($breakpoint-sm) {
      padding: 0.1rem;
      margin-top: 0.1rem;

      #name,
      #phone,
      #address {
        font-size: 0.8rem;
      }
    }

    @include mQ($breakpoint-md) {
      padding: 0.3rem;
      margin-top: 0.3rem;

      #name,
      #phone,
      #address {
        font-size: 0.7rem;
      }
    }
  }


  #products {
    font-weight: 550;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-around;

    .product-details,
    .group-details,
    .group-print {
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      padding: 0.2rem;
      margin: 0.3rem .5rem;
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

    .product-details,
    .group-print {
      cursor: pointer;

    }

    .group-prints {
      font-size: 0.75rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  button[type='submit'] {
    position: relative;
    right: 45%;
    margin: 0.5rem auto;
    @include submit-btn;
  }
}
</style>