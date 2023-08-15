import {ref, computed} from '@vue/reactivity';
import  { AxiosError } from 'axios';
import Cookies, {type CookieAttributes} from 'js-cookie';
// Utils
import {baseHttp} from '../utils/axios'
// Stores
import { reset } from './orders';
// types
import type { Partner } from './__types__';

// Composables
import { useAxiosError } from '../composables/errorsNotifications';
import { useSessionStorage } from '@vueuse/core';

const partner =  ref(useSessionStorage< string | null>('partner', null as string | null));

export const getPartner =  computed<Partner | null>(() => {
  if(partner && typeof partner.value == 'string') return JSON.parse(partner.value);
  return null
});

export const isPartner = computed<boolean>(() => {
  return getPartner.value ? true : false;
}); 

const tokenCookieOptions: CookieAttributes = {
  expires: 1 / 24 / 2,   // default to one day, so we make 1 day / 24 hours = 1 hour then we multiply it by 2
  sameSite: "strict",
  httpOnly: false
}

export async function signup(partnerData: Partner) {
  try {
    const req = await baseHttp.post(`/partner/signup`, partnerData);
    partner.value = JSON.stringify(req.data.partner);    
    Cookies.set("accessToken", req.data.accessToken, tokenCookieOptions)
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
};

export async function login(partnerData: Partner) {
  try {
    const req = await baseHttp.post(`/partner/login`, partnerData);
    partner.value = JSON.stringify(req.data.partner);
    Cookies.set("accessToken", req.data.accessToken, tokenCookieOptions);
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
};

const removeAllCookies = () => {
  Object.keys(Cookies.get()).forEach(function(cookieName) {
    Cookies.remove(cookieName);
  });
}

export async function logout() {
  // reset orders value
  reset();
  removeAllCookies()
  partner.value = null;
  window.location.href = '/'
};
