import {ref, computed} from '@vue/reactivity';
import  { AxiosError } from 'axios';
import Cookies from 'js-cookie';
// Utils
import {baseHttp, withAuthHttp } from '../utils/axios'
// types
import type { Order, Product, ProductGroup, Print } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';
import { useAxiosError } from '../composables/errorsNotifications';
// import { useSuccessNotification } from '../composables/successNotifiers';

// should resemble our storage
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

const orders =  ref<Order[]>([]);

export const getOrders = computed<Order[]>(() => {
    return orders.value;
});

export async function fetchOrders(name: string, phone: string) {
    try {
    const req = await baseHttp.post(`/orders/guest`,{ name, phone });
        orders.value = req.data;
    } catch (error) {
    if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
    }
    alert(error);
    }
};

export async function fetchPartnerOrders(partner: string) {
    try {
        const accessToken = Cookies.get("accessToken") ?? '';
        const req = await withAuthHttp(accessToken).get(`/orders/${partner}`);
        orders.value = req.data;
    } catch (error) {
    if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
    }
    alert(error);
    }
};
export async function newOrder(order: Order) {
    try {
        let apiOrder = `/order`;
        await baseHttp.post(apiOrder, order);
        // useSuccessNotsification('Operation was made successfully');
    } catch (error) {
    if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
    }
    alert(error);
    }
};


const productGroups =  ref(useSessionStorage('productsGroups', [] as ProductGroup[]));

export const getProductGroups = computed<ProductGroup[]>(() => {
    return productGroups.value;
});

export function addProductGroup(printsGroup: Print[], colors: string[]) {
    let fontType = (document.getElementById('fontType') as HTMLInputElement).value;

    let productGroup = {
        prints: printsGroup,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
    };
    productGroups.value.push(productGroup as ProductGroup);
};

const products = ref(useSessionStorage('products', [] as Product[]));

export const getProducts = computed<Product[]>(() => {
    return products.value;
});

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

export function reset() {
    orders.value = [];
    productGroups.value = [];
    products.value = [];
};
