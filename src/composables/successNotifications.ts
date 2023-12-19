import { ref } from 'vue';

export let httpSuccess = ref<{message: string} | null>();

export const useSuccessNotification = async (message: string) => {
  httpSuccess.value = { message };

  setTimeout(() => {
    httpSuccess.value = null;
  }, 3000);
};