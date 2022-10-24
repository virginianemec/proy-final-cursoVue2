<template>
   <ListadoPedidosComponent :orders="orders" :titulo="titulo"></ListadoPedidosComponent>
</template>

<script>
import { mapGetters } from 'vuex';
import ListadoPedidosComponent from '../components/ListadoPedidosComponent.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    ListadoPedidosComponent,
  },
  mounted() {
    this.getOrders();
  },
  computed: {
    ...mapGetters(['isAdmin', 'getUserLoggedId', 'getOrdersAll', 'getNegocios', 'getUserOrders']),
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    orders() {
      if (this.$route.params.idNegocio) {
        let negocio = [];
        negocio = this.$store.getters.getNegocios.find(
          (todo) => (todo.id === this.$route.params.idNegocio),
        );
        return negocio.orders;
      }
      if (this.$route.params.idUser) {
        return this.$store.getters.getUserOrders;
      }
      return this.$store.getters.getOrdersAll;
    },
    titulo() {
      if (this.$route.params.idNegocio) return `Pedidos de negocio ${this.$route.params.idNegocio}`;
      return this.isAdmin ? 'Listado de Todos los pedidos del sitio.' : 'Mis pedidos';
    },
  },
  methods: {
    // obtener los productos from api, desde el store.
    // cuando inicio la app.
    async getOrders() {
      await this.$store.dispatch('getOrdersAllFromApi', { id: this.userId, admin: this.isAdmin });
    },
  },
};
</script>

<style>
</style>
