<template>
   <ListadoPedidosComponent :orders="orders"></ListadoPedidosComponent>
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
    ...mapGetters(['isAdmin', 'getUserLoggedId', 'getOrdersAll']),
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    orders() {
      return this.$store.getters.getOrdersAll;
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
