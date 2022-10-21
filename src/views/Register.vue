<template>
  <div>
    <RegisterComponent />
    <!-- @registerSuccess="registerSuccess($event)" @back="returnToLogin()" /> -->
     <div class="divbtn"><router-link :to="{ name: 'Login' }">Inicio</router-link> </div>
  </div>
</template>

<script>
import RegisterComponent from '@/components/RegisterComponent.vue';

export default {
  components: {
    RegisterComponent,
  },
};
</script>

<style>
</style>
