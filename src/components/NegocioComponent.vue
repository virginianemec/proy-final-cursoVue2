<template>
  <div>
    <div class="tabla--titulo">{{ name }} - {{ category }} -
      <router-link v-if="isAdmin" :to="{ path: `pedidos/${this.id}` }">Pedidos</router-link> <br>
      <!--<div class="tabla--titulo">Productos del negocio</div>
      <div class="tabla--titulo"></div> -->
    </div>
     <br>
     <div>
      <ListadoProductosComponent :negocioId="this.id" :products="products" /> </div>
    <!--  @carritoUpdate="carritoUpdate($event)"-->
    <br />
    <!--  Pendiente proxima entrega  -->
        <!--
        <div class='tabla--datos'> Pedidos del negocio</div>
        <ListadoPedidosComponent :orders="orders"/>
        <br />

        <br />
        <div class='tabla--datos'> Ofertas</div>
        <ListadoOfertasComponent :ofertas='ofertas' />
        <br />
    -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
/*
import ListadoPedidosComponent from './ListadoPedidosComponent.vue';
import ListadoOfertasComponent from './ListadoOfertasComponent.vue';
*/
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
    orders: [],
    /* Products ya no es una props,
    // lo busco desde el api para el id de este negocio.
    products: [],
    */
    ofertas: [],
  },
  data() {
    return {
      productosFromApi: [],
      // url: 'https://632ba1f21aabd8373989647d.mockapi.io/productos/',
      // urlOrders: 'https://632ba1f21aabd8373989647d.mockapi.io/carritos/',
    };
  },
  // created() {
  create() {
    // this.getProducts();
    // this.getOrders();
  },
  computed: {
    ...mapGetters(['isAdmin', 'getUserLoggedId', 'getProducts']),
    products() {
      let productsArray = [];
      productsArray = this.$store.getters.getProducts.filter(
        (todo) => todo.negocio === parseInt(this.id, 10),
      );
      return productsArray;// getProductsByNegocioId(parseInt(this.id, 10));
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    /*
    productsNegocio() {
      return this.$store.dispatch('getProductsFromNegocio', parseInt(this.id, 10));
      console.table(this.productosFromApi);
      return this.productosFromApi;
    },
    */
  },
  methods: {
    /*
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
    */
    /*
    getProducts() {
      this.productosFromApi = this.$store.dispatch('getProductsFromNegocio', parseInt(this.id, 10));
    }, */
    /*
    await this.axios
      .get(`${this.url}?negocio=${this.id}`)
      .then((response) => {
        console.table(response.data);
        this.productosFromApi = response.data;
      })
      .catch((err) => {
        console.error(`${err}`);
      });
      */
    /* async getOrders() {
      // por ahora: son los items de los carritos de los usuarios que tienen el estado = COMPRADO.
      await this.axios
        .get(`${this.urlOrders}?negocio=${this.id}`)
        .then((response) => {
          console.table(response.data);
          // const respArray = response.data;
          // this.orders.push(respArray.forEach((val) =>
          // { val.negocio === parseInt(this.id); }));
          this.orders = response.data;
        })
        .catch((err) => {
          console.log('error', err);
        })
        .finally(() => console.log('Peticion terminada'));
    },
    */
  },
  components: {
    ListadoProductosComponent,
    // ListadoPedidosComponent,
    // ListadoOfertasComponent,
  },
};
</script>

<style scoped>

.tabla--titulo {
  background: yellowgreen;
  height: 25px;
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
