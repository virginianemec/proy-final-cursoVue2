<template>
  <div>
    <RegisterComponent />
     <div class="divbtn"><router-link :to="{ name: 'Login' }">Inicio - Login</router-link> </div>
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
