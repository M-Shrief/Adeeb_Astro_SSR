<template>
  <section id="authentication">
    <h3>{{ isRegistered ? "تسجيل الدخول" : "تسجيل حساب جديد" }} </h3>
    <Form @submit="onSubmit" id="auth-form">
      <div v-if="!isRegistered" class="input-cont">
        <label for="name">الاسم: </label>
        <Field name="name" id="name" autocomplete="name"  :rules="nameRules" />
        <ErrorMessage name="name" class="error" />
      </div>
      <div class="input-cont">
        <label for="phone">رقم الهاتف: </label>
        <Field name="phone" id="phone" autocomplete="phone"  :rules="phoneRules" />
        <ErrorMessage name="phone" class="error" />
      </div>
      <div class="input-cont">
        <label for="password">كلمة السر: </label>
        <Field type="password" name="password" id="password" 
          :rules="passwordRules" />
        <ErrorMessage name="password" class="error" />
      </div>
      <button type="submit">التأكيد</button>
    </Form>
    <button id="toggle" @click="isRegistered = !isRegistered">
      {{ !isRegistered ? "تسجيل الدخول" : "تسجيل حساب جديد" }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Validation
import { Form, Field, ErrorMessage } from 'vee-validate';
import { nameRules, phoneRules, passwordRules } from '../utils/forms.schema'
// stores
import { isPartner, login, signup } from '../stores/partners';
// Composables
import { useAxiosError } from '../composables/errorsNotifications';

const isRegistered = ref(true);

// const emits = defineEmits(['login', 'signup'])
async function onSubmit(values: any) {
  if (isRegistered.value) {
    // emits('login', values)
    await login(values)
    .then(() => {
      if (isPartner.value) window.location.href = '/';
    })
    .catch(error => useAxiosError(error));
  } else {
    // emits('signup', values)
    await signup(values)
    .then(() => {
      if (isPartner.value) window.location.href = '/';
    })
    .catch(error => useAxiosError(error));
  }
}
</script>

<style lang="scss" scoped>
$mainColor: var(--text1);
$secondaryColor: var(--surface2);
$inputsColor: var(--surface1);

#authentication {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 40vh;
  margin: 1rem;
  padding: 4rem;
  background-color: $secondaryColor;
  border-radius: 1rem;
  color: $mainColor;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  h3 {
    text-align: center;
  }

  #auth-form {
    display: flex;
    flex-direction: column;
  }
  .input-cont {
    display: block;
    padding: 0.2rem;
    margin: 0.3rem;
    input {
      color: $mainColor;
      background: $inputsColor;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 8px;
      min-width: 30%;
    }
  }

  .error {
    color: #c80815;
    margin-right: 1rem;
  }

  button {
    color: $mainColor;
    background: $inputsColor;
    border: none;
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
  }


  button[type='submit'] {
    place-self: center;
  }

  #toggle {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
  }
}
</style>

