<template>
  <div id='app'>
    <img alt='Vue logo' src='./assets/logo.png' />
    <div v-if="loginFunction">
      <LoginComponent :login-correcto="true" @loginSussec="loginSussec()" />
      <br />
      <h2>No tengo cuenta</h2>
      <button class="btn-primary" @click="registrame()">Registrarme </button>
      </div>

    <div v-if="registerFunction">

       <RegisterComponent :register-correcto="true" @registerSussec="registerSussec()"/>

    </div>
     <div v-if="indexFunction">
          <ListadoPedidosComponent />
    </div>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import ListadoPedidosComponent from '@/components/ListadoPedidosComponent.vue';

export default {
  name: 'App',
  components: {
    LoginComponent,
    RegisterComponent,
    ListadoPedidosComponent,
  },
  data() {
    return {
    // Data que se usa solo a fines practicos, calculo que luego no se usaran
    // para mostrar solo la primer pantalla login.
      loginFunction: true,
      indexFunction: false,
      registerFunction: false,
    };
  },
  methods: {
    loginSussec() {
    // Enviar al index
      console.log('hola!! bienvenido al index.');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
      // this.$alert('Bienvenido', 'Atención', 'success');
    },
    registrame() {
      this.loginFunction = false;
      this.registerFunction = true;
      this.indexFunction = false;
    },
    registerSussec() {
    // Enviar al index
      console.log('hola!! register');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
      // this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
