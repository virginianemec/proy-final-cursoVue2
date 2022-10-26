<template>
  <div class="header">
      <div v-if="userIsLogged" class="navbarMenu">
           Bienvenido {{ userName }}
            <router-link :to="{ name: 'Index' }">Inicio</router-link>
            <div v-if="isAdmin">
             <router-link :to="{ name: 'Productos' }">ABM Productos</router-link> || 
             <router-link :to="{ name: 'Pedidos' }">Ver Todos los Pedidos</router-link>
            </div>
            <router-link :to="{ path: `pedidosDelUser/${this.userId}` }">Mis Pedidos</router-link>
            <router-link :to="{ name: 'Carrito' }">Ver Carrito</router-link>
            <a href="" @click="$store.dispatch('logout')">Cerrar Session</a>
      </div>
 </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderComponent',
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
      return this.$store.getters.isAdmin ? 'Ver Todos los Pedidos' : 'Mis Pedidos';
    },
    userName() {
      return this.$store.getters.getUserLoggedName;
    },
  },
};
</script>
