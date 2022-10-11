<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <p style="text-align: center;">
      El usuario 'virginia@ta.com' es el user Admin.
      cecilia@ta.com es un usuario sin privilegios.
      <br />Password es requerido pero no se valida.
    </p>
    <article>
      <LoginComponent />
      <div class="title">No tengo cuenta</div>
      <button type="submit" class="btn btn-primary" @click="registrame()">Registrarme</button>
    </article>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import LoginComponent from '@/components/LoginComponent.vue';

export default {
  data() {
    return {
      // user: null,
    };
  },
  mounted() {
  // this.getUserLogged();
  },
  methods: {
    // este metodo lo llamaba el logincomponent para ir al index.
    // @loginSuccess="loginSuccess($event)"
    /*
    loginSuccess(user) {
      this.user = user;
      // CONSULTAR IVAN: problema!! no puedo reiniciar el header con el usuarios!
      // por eso mando el user al app, pero no hay caso. lo estoy mandando mal. o bien
      // lo pierdo antes.
      // ->this.$emit('loginSuccess', this.user);
      // this.$alert('Bienvenido', 'Atención', 'success');
       this.$router.push({ name: 'Index', query: { user: this.user } });
    },
    */
    registrame() {
      this.$router.push({ name: 'Register' });
    },
  },
  components: {
    LoginComponent,
  },
  /*
  computed: {
    ...mapGetters(['getUserLogged']),
    user() {
      return this.$store.getters.getUserLogged;
    },
  },
  */
};
</script>
