<template>
  <section id="authentication">
    <h3>{{ isRegistered ? ui[currentLocale].authForm.login : ui[currentLocale].authForm.signup }} </h3>
    <Form @submit="onSubmit" id="auth-form">
      <div v-if="!isRegistered" class="input-cont">
        <label for="name">{{ui[currentLocale].authForm.name}}: </label>
        <Field name="name" id="name" autocomplete="name"  :rules="nameRules" />
        <ErrorMessage name="name" class="error" />
      </div>
      <div class="input-cont">
        <label for="phone">{{ ui[currentLocale].authForm.phone }}: </label>
        <Field name="phone" id="phone" autocomplete="phone"  :rules="phoneRules" />
        <ErrorMessage name="phone" class="error" />
      </div>
      <div class="input-cont">
        <label for="password">{{ui[currentLocale].authForm.password}}: </label>
        <Field type="password" name="password" id="password" 
          :rules="passwordRules" />
          <ErrorMessage name="password" class="error" />
      </div>
      <button type="submit">{{ui[currentLocale].authForm.submit}}</button>
    </Form>
    <button id="toggle" @click="isRegistered = !isRegistered" >
      {{ !isRegistered ? ui[currentLocale].authForm.login : ui[currentLocale].authForm.signup }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Validation
import { Form, Field, ErrorMessage } from 'vee-validate';
import { nameRules, phoneRules, passwordRules } from '../utils/forms.schema'
// stores
import { actions as partnerActions, isPartner } from '../stores/partners';
// UI
import { ui } from '../i18n/ui'

defineProps<{
  currentLocale: keyof typeof ui;
}>();

const isRegistered = ref(true);

// const emits = defineEmits(['login', 'signup'])
async function onSubmit(values: any) {
  if (isRegistered.value) {
    // emits('login', values)
    await partnerActions.login(values)
    .then(() => {
      if (isPartner.value) window.location.href = '/';
    })
  } else {
    // emits('signup', values)
    await partnerActions.signup(values)
    .then(() => {
      if (isPartner.value) window.location.href = '/';
    })
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
  height: 30vh;
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
    place-self: end;
    margin: 0;
    bottom: 1rem;
  }
}
</style>

