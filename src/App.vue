<template>
    <div id='app' class=''>
    <img alt='Mi app de Comidas!' src='./assets/logo.png' />
    <div v-if='loginFunction'>
      <LoginComponent :login-correcto='true' @loginSuccess='loginSuccess()' />

      <h3>No tengo cuenta</h3>
      <button type='button' class='btn btn-primary' @click='registrame()' >Registrarme </button>
      </div>

    <div v-if='registerFunction'>

       <RegisterComponent :register-correcto='true' @registerSuccess='registerSuccess()'
        @volver='volverALogin()'/>

    </div>
     <div v-if='indexFunction'>
          <ListadoNegociosComponent  @volver='volverALogin()'/>
    </div>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import ListadoNegociosComponent from '@/components/ListadoNegociosComponent.vue';

export default {
  name: 'App',
  components: {
    LoginComponent,
    RegisterComponent,
    ListadoNegociosComponent,
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
    loginSuccess() {
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
    registerSuccess() {
    // Enviar al index
      console.log('hola!! register');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
      // this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
    },
    volverALogin() {
      this.loginFunction = true;
      this.registerFunction = false;
      this.indexFunction = false;
    },
    volverARegister() {
      this.loginFunction = false;
      this.registerFunction = true;
      this.indexFunction = false;
    },
    volverAIndex() {
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
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
