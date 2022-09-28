<template>
  <div>
    <RegisterComponent @registerSuccess="registerSuccess($event)" @back="returnToLogin()" />
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
