import {ref} from 'vue';

export let httpError = ref<{message: string} | null>();

export const useFetchError = async (err: {message: string}) => {
  httpError.value = err
  setTimeout(() => {
    httpError.value = null;
  }, 3000);
};

