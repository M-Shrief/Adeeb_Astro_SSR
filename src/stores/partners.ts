import {ref, computed} from '@vue/reactivity';
import Cookies from 'js-cookie';
// Utils
import {ContentType, apiURL} from '../utils/fetch'
// Stores
import { reset } from './orders';
// types
import type { Partner } from './__types__';

// Composables
import { useFetchError } from '../composables/errorsNotifications';
import { useSessionStorage } from '@vueuse/core';

export const partner =  ref(useSessionStorage< string | null>('partner', null as string | null));

/**
 * Get Partner computed value
 */
export const getPartner =  computed<Partner | null>(() => {
  if(partner && typeof partner.value == 'string') return JSON.parse(partner.value);
  return null
});

/**
 * Check if User is partner or not
 */
export const isPartner = computed<boolean>(() => {
  return getPartner.value ? true : false;
}); 

/**
 * Cookie options for JWT token
 */
const tokenCookieOptions = {
  expires: 1 / 24 / 2,   // default to one day, so we make 1 day / 24 hours = 1 hour then we multiply it by 2
  sameSite: "strict" as "strict",
  httpOnly: false
}

/**
 * Signup usign partner data (name, phone, password). if successful, it will assign returning user value to partner and token as accessToken cookie
 * 
 * @param {Partner} partnerData - partner's data
 */
async function signup(partnerData: Partner) {
  const res = await fetch(
    apiURL(`/partner/signup`), 
    {
      method: "POST",
      headers: {
        'Content-Type': ContentType.JSON, 
      },
      body: JSON.stringify(partnerData)
    }
  )
  if(res.ok) {
    const data = await res.json()
    partner.value = JSON.stringify(data.user)
    Cookies.set("accessToken", data.token, tokenCookieOptions);
  } else {
    useFetchError(await res.json())
  }
};

/**
 * Login usign partner data (phone, password). if successful, it will assign returning user value to partner and token as accessToken cookie
 * 
 * @param {Partner} partnerData - partner's data
 */
async function login(partnerData: Partner) {
  const res = await fetch(
    apiURL(`/partner/login`), 
    {
      method: "POST",
      headers: {
        'Content-Type': ContentType.JSON, 
      },
      body: JSON.stringify(partnerData)
    }
  )
  if(res.ok) {
    const data = await res.json()
    console.log(data)
    partner.value = JSON.stringify(data.user)
    Cookies.set("accessToken", data.token, tokenCookieOptions);
  } else {
    useFetchError(await res.json())
  }
};

const removeAllCookies = () => {
  Object.keys(Cookies.get()).forEach(function(cookieName) {
    Cookies.remove(cookieName);
  });
}

/**
 * Logout, reset order's store values, remove all cookies and partner value.
 */
async function logout() {
  // reset orders value
  reset();
  removeAllCookies()
  partner.value = null;
  window.location.href = '/'
};

export const actions = {
  login,
  signup,
  logout,
}