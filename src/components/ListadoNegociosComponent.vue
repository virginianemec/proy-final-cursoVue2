<template>
  <div class="container">
    <h1>Mis negocios</h1>

    <div class="d-flex justify-content-beetween row">
      <div v-for="negocio in negocios" :key="negocio.id">
        <NegocioComponent
          :id="negocio.id"
          :name="negocio.name"
          :category="negocio.category"
          :ofertas="negocio.ofertas"
          :orders="negocio.orders"
        ></NegocioComponent>
        <!--  @carritoUpdate="carritoUpdate($event)"-->
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NegocioComponent from './NegocioComponent.vue';

export default {
  name: 'ListadoNegociosComponent',
  components: {
    NegocioComponent,
  },
  props: {
    // carrito: [],
    // negocios: [],
  },
  methods: {
    async carritoUpdate(objProdCant) {
      // await this.$store.dispatch('updateCarrito', objProdCant, this.userId);
      // await this.carritoUserFromApi();
      // TODO no sirve..
      console.log(objProdCant);
    },
    async cargarProps() {
      // await this.$store.dispatch('getNegociosFromApi');
      // await this.$store.dispatch('productsFromApi');
    },
  },
  mounted() {
    this.cargarProps();
  },
  data() {
    return {
      // productosFromApi: [],
      // url: 'https://632ba1f21aabd8373989647d.mockapi.io/productos',
    };
  },
  computed: {
    ...mapGetters(['getNegocios']), // , 'getUserCarrito', 'getUserLoggedId']),
    negocios() {
      return this.$store.getters.getNegocios;
    },
    /*
    carrito() {
      return this.$store.getters.getUserCarrito;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    */
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 20px;
  color: #dd845a;
}
</style>
