<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <p style="text-align: center;">
      El usuario virginia@ta.com es el user Admin.
      <br />Password es requerido pero no se valida.
      <br />Es el unico usuario que podria crear en próxima etapa los usuarios con tipo.
    </p>
    <article>
      <LoginComponent :user="user" @loginSuccess="loginSuccess($event)" />
      <div class="title">No tengo cuenta</div>
      <button type="submit" class="btn btn-primary" @click="registrame()">Registrarme</button>
    </article>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    loginSuccess(user) {
      this.user = user;
      // CONSULTAR IVAN: problema!! no puedo reiniciar el header con el usuarios!
      // por eso mando el user al app, pero no hay caso. lo estoy mandando mal. o bien
      // lo pierdo antes.
      this.$emit('loginSuccess', this.user);
      // this.$alert('Bienvenido', 'Atención', 'success');
      this.$router.push({ name: 'Index', query: { user: this.user } });
    },
    registrame() {
      this.$router.push({ name: 'Register' });
    },
  },
  components: {
    LoginComponent,
  },
};
</script>
