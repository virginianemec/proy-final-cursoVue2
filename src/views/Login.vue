<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- <p style="text-align: center;">
       El usuario 'virginia@ta.com' es el user Admin.
      'cecilia@ta.com' es un usuario sin privilegios.
      <br />Password es requerido pero no se valida.
    </p>
     -->
    <LoginComponent />
    <div class="title">No tengo cuenta</div>
    <div class="divbtn">
      <button type="submit" class="btn btn-primary" @click="registrame()">
        Registrarme
      </button>
    </div>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';

export default {
  methods: {
    registrame() {
      this.$router.push({ name: 'Register' });
    },
  },
  components: {
    LoginComponent,
  },
};
</script>
