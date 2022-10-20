<template>
  <div id="app">
    <HeaderComponent/>
    <router-view></router-view>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
// import DatosBD from './datosBD';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      // Data que se usa solo a fines practicos, calculo que luego no se usaran
      // para mostrar solo la primer pantalla login.
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      /*
      loginFunction: true,
      indexFunction: false,
      registerFunction: false,

      carrito: [],
      negocios: DatosBD.negocios,
      users: [{ email: 'virginia@ta.com', password: '123' }],
      user: null,
      */
    };
  },
  /*
  computed: {
    buttonReturnShowInHeader() {
      return this.loginFunction || this.registerFunction;
    },
  },
  */
  methods: {
    // lleve este metodo a loginview?
    /*
    loginSuccess(user) {
      // Enviar al index
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      // console.log('hola!! bienvenido al index.');
      this.user = user;
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
      // this.$alert('Bienvenido', 'Atención', 'success');
    },
    registrame() {
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      this.loginFunction = false;
      this.registerFunction = true;
      this.indexFunction = false;
    },
    registerSuccess(user) {
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      this.users.push(user);
      // Enviar al index
      // console.log('hola!! register');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;

      // this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
    },
    returnToLogin() {
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      this.loginFunction = true;
      this.registerFunction = false;
      this.indexFunction = false;
    },
    */
  },
};
</script>

<style>
/*
* {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.42857143;
  color: #959595;
  box-sizing: border-box;
}
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0;
}
#main {
  display: flex;
  flex: 1;
}
#main > article {
  margin: 1rem auto;
  display: flex;
  flex: 1;
  /* este etsa*/
/*  margin: 1rem auto;
  text-align: center;
}
#main > aside {
  flex: 0 0 20vw;
  background: beige;
}
article,
aside {
  padding: 1em;
  text-align: center;
}
.btn-primary {
  color: #fff;
  background-color: orange;
  border-color: orange;
}
.title {
  text-align: center;
  font-weight: bold;
  color: #504c4c;
  font-size: calc(1.3rem + 0.6vw);
}
*/

body {
  font-family: Arial;
  margin: 0;
}

/* Header/Logo Title */
.header {
  padding: 20px;
  text-align: center;
  /* background: #1abc9c;
    font-size: 15px;*/
  color: white;
  background-image: url('../src/assets/tituloHeader.png');
  background-size: cover;
}

/* Page Content */
.content {padding:20px;}

/* barra de tareas */
.navbarMenu {
    display: inline-flex;
    justify-content: space-between;
    gap: 20px;
}

@media screen and (max-width: 575px) {
  * {
    max-width: 100%;
  }
}
</style>
