import { ref } from 'vue';

export let successMsg = ref<string | null>(null);

export const useSuccessNotification = async (message: string) => {
    successMsg.value = message ;

  setTimeout(() => {
    successMsg.value = null;
  }, 3000);
};
