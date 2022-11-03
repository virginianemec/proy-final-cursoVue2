<template>
  <div>
    <div class="tabla--titulo">{{ name }} - {{ category }}
      <router-link v-if="isAdmin"
      :to="{ name: 'PedidosDelNegocio', params: { idNegocio: this.id }}">
      Ver Pedidos</router-link> <br>
    </div>
     <br>
      <ListadoProductosComponent :negocioId="this.id" :products="products" />
    <br />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ListadoProductosComponent from './ListadoProductosComponent.vue';

export default {
  name: 'NegocioComponent',
  props: {
    name: {
      type: String,
      default: 'Sin nombre',
    },
    category: {
      type: String,
      default: 'Sin categoria',
    },
    id: {
      type: String,
      default: '',
    },
  // ofertas: [],
  },
  computed: {
    ...mapGetters(['isAdmin', 'getProducts']),
    products() {
      let productsArray = [];
      productsArray = this.$store.getters.getProducts.filter(
        (todo) => todo.negocio === parseInt(this.id, 10),
      );
      return productsArray;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  components: {
    ListadoProductosComponent,
  },
};
</script>

<style scoped>

.tabla--titulo {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background: yellowgreen;
  color: black;
  text-align: center;
  padding: 20px;
  font-size: large;
}
.tabla--datos {
  background: yellowgreen;
  height: 25px;
  color: black;
  font: bold;
}
a {
    color: #302e2e;
    text-decoration: none;
}
a:hover{
  color: aquamarine;
}
</style>
