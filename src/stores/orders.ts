import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import  { AxiosError } from 'axios';
import {baseHttp } from '../utils/axios'
// types
import type { Order, Product, ProductGroup, Print } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';
// import { useAxiosError } from '../composables/error';
// import { useSuccessNotification } from '../composables/success';

export const useOrderStore = defineStore('orders', 
  () => {
    const orders =  ref<Order[]>([]);
    const getOrders = computed<Order[]>(() => {
      return orders.value;
    });
    async function fetchOrders(name: string, phone: string) {
      try {
        const req = await baseHttp.post(
          `/orders/guest`,
          { name, phone }
        );
        orders.value = req.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
    };
    async function fetchPartnerOrders(partner: string) {
      try {
        // const req = await withAuthHttp.get(
        //   `/orders/${partner}`
        // );
        // orders.value = req.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
    };
    async function newOrder(order: Order) {
      try {
        let apiOrder = `/order`;
        await baseHttp.post(apiOrder, order);
        // useSuccessNotification('Operation was made successfully');
      } catch (error) {
        if (error instanceof AxiosError) {
          // useAxiosError(error);
          return;
        }
        alert(error);
      }
    };


    const productGroups =  ref(useSessionStorage('productsGroups', [] as ProductGroup[]));
    const getProductGroups = computed<ProductGroup[]>(() => {
      return productGroups.value;
    });
    function addProductGroup(printsGroup: Print[], colors: string[]) {
      let fontType = (document.getElementById('fontType') as HTMLInputElement)
        .value;

      let productGroup = {
        prints: printsGroup,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
      };
      productGroups.value.push(productGroup as ProductGroup);
    };

    const products = ref(useSessionStorage('products', [] as Product[]));
    const getProducts = computed<Product[]>(() => {
      return products.value;
    });
    function addProduct(print: Print, colors: string[]) {
      let fontType = (document.getElementById('fontType') as HTMLSelectElement)
        .value;
      let product = {
        print: print,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
      };
      // Note: Don't check on repeated ones
      // it's normal to get different colors for the same print
      products.value.push(product as Product);
    };

    const colors =  [
      '#fff',
      '#000',
      '#2c3e50',
      '#c80815',
      '#42b983',
      '#dc5318',
      'silver',
      '#f6b352',
    ];
    
    function reset() {
      orders.value = [];
      productGroups.value = [];
      products.value = [];
    };

    return { getOrders, fetchOrders, fetchPartnerOrders, newOrder,  getProductGroups, addProductGroup,  getProducts, addProduct, colors, reset}
  },
)
