import {ref, shallowRef, computed} from '@vue/reactivity';
import Cookies from 'js-cookie';
// Utils
import { ContentType, apiURL } from '../utils/fetch';
// types
import type { Order, Product, ProductGroup, Print } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';
import { useFetchError } from '../composables/errorsNotifications';
import { useSuccessNotification } from '../composables/successNotifications';

/**
 * colors array, should resemble our storage
 */ 
export const colors =  [
    '#fff',
    '#000',
    '#2c3e50',
    '#c80815',
    '#42b983',
    '#dc5318',
    'silver',
    '#f6b352',
];

const orders =  shallowRef<Order[]>([]);

/**
 * Get orders computed value
 */
export const getOrders = computed<Order[]>(() => {
    return orders.value;
});

/**
 * Fetch guest's orders from API, and assign it to orders ref.
 * @param {string} name - guest's name 
 * @param {string} phone - guest's phone
 */
export async function fetchOrders(name: string, phone: string) {
    const res = await fetch(
        apiURL(`/orders/guest`), 
        {
          method: "POST",
          headers: {
            'Content-Type': ContentType.JSON, 
          },
          body: JSON.stringify({name, phone})
        }
    )
    if (res.ok) {
        orders.value = await res.json()
    } else {
        useFetchError(await res.json())
    }
};

/**
 * Fetch partner's orders from API, and assign it to orders ref.
 * 
 * Uses accessToken cookie.
 */
export async function fetchPartnerOrders() {
    const accessToken = Cookies.get("accessToken") ?? '';
    const res = await fetch(
        apiURL(`/orders/partner`), 
        {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
    )
    if (res.ok) {
        orders.value = await res.json()
    } else {
        useFetchError(await res.json())
    }
};

/**
 * Create a new Guest order
 * @param {Order} order - guest's order 
 */
export async function newGuestOrder(order: Order) {
    const res = await fetch(
        apiURL(`/order/guest`),
        {
          method: "POST",
          headers: {
            'Content-Type': ContentType.JSON, 
          },
          body: JSON.stringify(order),
          
        }
    )
    if(res.ok) {
        useSuccessNotification('Operation was made successfully');
    } else {
        useFetchError(await res.json())
    }
};

/**
 * Create a new Partner order
 * 
 * Uses accessToken cookie
 * @param {Order} order - partner's order 
 */
export async function newPartnerOrder(order: Order) {
    const accessToken = Cookies.get("accessToken") ?? '';
    const res = await fetch(
        apiURL(`/order/partner`),
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            'Content-Type': ContentType.JSON, 
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(order),
          
        }
    )
    if(res.ok) {
        useSuccessNotification('Operation was made successfully');
    } else {
        useFetchError(await res.json())
    }
};


const productGroups =  ref(useSessionStorage('productsGroups', [] as ProductGroup[]));

/**
 * Get ProductGroups computed value
 */
export const getProductGroups = computed<ProductGroup[]>(() => {
    return productGroups.value;
});

/**
 * Add ProductGroup to productGroups ref.
 * 
 * @param {Print[]} prints - an array of prints
 * @param {string[]}colors - [fontColor, backgroundColor] in hex code
 */
export function addProductGroup(prints: Print[], colors: string[]) {
    let fontType = (document.getElementById('fontType') as HTMLInputElement).value;

    let productGroup = {
        prints: prints,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
    };
    productGroups.value.push(productGroup as ProductGroup);
};

const products = ref(useSessionStorage('products', [] as Product[]));

/**
 * Get Products computed value
 */
export const getProducts = computed<Product[]>(() => {
    return products.value;
});

/**
 * Add Product to products ref.
 * 
 * @param {Print} print - print item 
 * @param {string[]}colors - [fontColor, backgroundColor] in hex code
 */
export function addProduct(print: Print, colors: string[]) {
    let fontType = (document.getElementById('fontType') as HTMLSelectElement).value;
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

/**
 * Reset orders, productGroups, product values.
 */
export function reset() {
    orders.value = [];
    productGroups.value = [];
    products.value = [];
};
