<template>
  <div class="coder--header">
    <h1>PediSalud</h1>
    <h1>¡Nuestra web de comidas saludables!</h1>

      <div v-if="userIsLogged" class="div--container">
           Bienvenido {{ userName }}
            <router-link :to="{ name: 'Index' }">Inicio</router-link>
            <div v-if="isAdmin">
             <router-link :to="{ name: 'Productos' }">ABM Productos</router-link>
            </div>
            <router-link :to="{ name: 'Pedidos' }">{{tituloPedidos}}</router-link>
            <router-link :to="{ name: 'Carrito' }">Ver Carrito</router-link>

            <a href="" @click="$store.dispatch('logout')">Cerrar Session</a>
      </div>

    <!-- <div v-if="user">
      <button type="button" class="btn btn-primary" @click="back()">Cerrar Sesión</button>
      <div id="menu">
        <router-link to="/">Login</router-link>
      </div>
    </div> -->

 </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderComponent',
  props: {
    // user: null,
    /*
    no tenog mas esta variable ni el emit del app.
    ahora con el usuario logueado defino el header.
    y con el router el back.
  */
  },
  methods: {
    back() {
      // this.$emit('back');
      this.$router.push({ name: 'Login' });
    },
  },
  computed: {
    ...mapGetters(['getUserLogged', 'getUserLoggedId', 'isAdmin', 'getUserLoggedName']),
    user() {
      return this.$store.getters.getUserLogged;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    userIsLogged() {
      return (this.$store.getters.getUserLogged.name !== '');
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    tituloPedidos() {
      return this.$store.getters.isAdmin ? 'Ver Todos los Pedido' : 'Mis Pedidos';
    },
    userName() {
      return this.$store.getters.getUserLoggedName;
    },
  },
};
</script>
<style scoped>
.coder--header {
  width: 100%;
 /* background-image: url("../assets/logo.png"); */
  background-color: orange;
  background-size: cover;
  background-position: center;
}
h1 {
  text-align: center;
  /*padding: 20px;*/
  color: #131212;
}
.title {
  text-align: center;
  color: #1a1919;
  font-size: calc(1.5rem + 1.5vw);
}
.div--container {
    background-color: yellowgreen;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    gap: 10px;
    width: 100%;
    padding-top: 20px;
}
a {
    color: #302e2e;
    text-decoration: none;
}
a:hover{
  color: aquamarine;
}
</style>
