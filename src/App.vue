<template>
  <div id="app">
    <HeaderComponent/>
    <div class="content">
    <router-view></router-view>
    </div>
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
    font-size: 15px;
      color: orange; */
  color:  rgb(214, 142, 45);
  background-image: url('../src/assets/tituloHeader1.png');
  background-size: cover;
  height: 250px;
  display: flex;
  align-items: flex-end;
}
.header div {
  background-color: black;
}
.header div a {
    text-decoration: none;
    /*color: orange;*/
    color:  rgb(214, 142, 45);
}
.header div a:hover{
  color: aquamarine;
}

.encabezado {
  text-align: center;
  /* color : orange;*/
  color: rgb(214, 142, 45);
  padding-block: 5px;
  font-size: 2em;
  font-weight: bold;
}

/* Page Content */
.content {
    padding:20px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }

  .scroll {
      display: block;
      border: 0px solid red;
      padding: 5px;
      margin-top: 5px;
      width: 100%;
      height: 100px;
      overflow-y: scroll;
        }
/* barra de tareas */
.navbarMenu {
    display: inline-flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    height: 10%;
    padding: 10px;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
/*
.btn-primary {
  color: #fff;
  background-color: orange;
  border-color: orange;
}*/
.form-caja{
  /*border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  width: 400px;*/
  background-color: #fff;
  width: 400px;
  text-align: center;
  padding: 20px 0 0 0;
  border-radius: 4px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  /*box-shadow: 0px 30px 50px 0px r*/
    margin: 20px auto;
}
.form {
      padding: 0 30px;
}

.btn-primary {
    color: #fff;
    /* background-color: orange;
    border-color: orange; */
    background-color: rgb(214, 142, 45);
    border-color: rgb(214, 142, 45);

    width: 50%;
    margin-bottom: 10px;
    font-size: 16px;
}
.class-label {
  color: #04000a;
}
.divbtn {
   text-align: center;
}

.title {
  text-align: center;
  font-weight: bold;
  color: #504c4c;
  /* font-size: calc(1.3rem + 0.6vw); */
}
p {
  position: relative;
}

input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  height: 30px;
  line-height: 60px;
  border-radius: 4px;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"] {
  width: 100%;
  padding: 0 0 0 10px;
  margin: 0;
  color: #8a8b8e;
  border: 1px solid #c2c0ca;
  font-style: normal;
  font-size: 16px;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  position: relative;
  display: inline-block;
  background: none;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@media screen and (max-width: 575px) {
  * {
    max-width: 100%;
  }
}
</style>
