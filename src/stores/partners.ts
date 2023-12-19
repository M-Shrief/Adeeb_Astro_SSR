import {ref, computed} from '@vue/reactivity';
import  { AxiosError } from 'axios';
import Cookies from 'js-cookie';
// Utils
import {baseHttp} from '../utils/axios'
import {ContentType, apiURL} from '../utils/fetch'
// Stores
import { reset } from './orders';
// types
import type { Partner } from './__types__';

// Composables
import { useFetchError } from '../composables/errorsNotifications';
import { useSessionStorage } from '@vueuse/core';

export const partner =  ref(useSessionStorage< string | null>('partner', null as string | null));

export const getPartner =  computed<Partner | null>(() => {
  if(partner && typeof partner.value == 'string') return JSON.parse(partner.value);
  return null
});

export const isPartner = computed<boolean>(() => {
  return getPartner.value ? true : false;
}); 

const tokenCookieOptions = {
  expires: 1 / 24 / 2,   // default to one day, so we make 1 day / 24 hours = 1 hour then we multiply it by 2
  sameSite: "strict" as "strict",
  httpOnly: false
}

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
    partner.value = JSON.stringify(data.partner)
    Cookies.set("accessToken", data.accessToken, tokenCookieOptions);
  } else {
    useFetchError(await res.json())
  }
};

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
    partner.value = JSON.stringify(data.partner)
    Cookies.set("accessToken", data.accessToken, tokenCookieOptions);
  } else {
    useFetchError(await res.json())
  }
};

const removeAllCookies = () => {
  Object.keys(Cookies.get()).forEach(function(cookieName) {
    Cookies.remove(cookieName);
  });
}

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