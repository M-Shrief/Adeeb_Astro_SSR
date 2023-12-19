<template>
  <div class="flex-center" >
    <div v-if="httpError" class="popup popup-error">
      <p>
        {{ httpError.message }}
      </p>
    </div>
    <div v-if="httpSuccess" class="popup popup-success">
      <p>{{ httpSuccess.message }}</p>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { httpError } from '../../composables/errorsNotifications'
  import { httpSuccess } from '../../composables/successNotifications'
</script>
  
<style lang="scss">
$red: #970707;
$white: #ececec;
$green: #28965a;

.flex-center {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  position: absolute;
  z-index: 101;
  padding: 0.2rem;
  margin: 0;
  top: 3rem;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  border-left: 0.3rem solid $red;
  border-bottom: 0.3rem solid $red;
  border-radius: 1rem;
  box-shadow: 0 0 5px black;
  background-color: $white;
  color: $red;
  animation: 3s ease-in-out alternate both running slideDown;
}

.popup-error {
  border-left: 0.3rem solid $red;
  border-bottom: 0.3rem solid $red;
  color: $red;
}

.popup-success {
  border-left: 0.3rem solid $green;
  border-bottom: 0.3rem solid $green;
  color: $green;
}

@keyframes slideDown {

  0%,
  100% {
    transform: translateY(-3.5rem) scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  70% {
    transform: scale(0.9);
  }

  10%,
  90% {
    transform: translateY(0px) scale(1);
  }
}
</style>