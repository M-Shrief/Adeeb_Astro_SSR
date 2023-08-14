import {ref} from 'vue';
import type { AxiosError } from 'axios';

export const httpError = ref();

export const useAxiosError = async (axiosError: AxiosError) => {
  if (axiosError.response?.data) {
    httpError.value = axiosError.response.data;
  } else if (axiosError.message) {
    httpError.value = axiosError;
  }

  setTimeout(() => {
    httpError.value = null;
  }, 3000);
};
