<template>
  <div class="contenedor">
    <div v-for="product in products" :key="product.id">
      <CardProducto
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        :cant="product.cant"
        :negocio="product.negocio"
      ></CardProducto>
      <!-- @carritoUpdate="carritoUpdate($event)" -->
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import CardProducto from '@/components/CardProducto.vue';

export default {
  name: 'ListadoProductosComponent',
  components: {
    CardProducto,
  },
  props: {
    negocioId: String,
    products: [],
  },
  mounted() {
    // this.products = this.$store.dispatch('getProductsFromNegocio', parseInt(this.negocioId, 10));
  },
  data() {
    return {
      // products: [],
    };
  },
  methods: {
    back() {
      this.$emit('back');
    },
    /*
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
    */
  },
  computed: {
    /*
    ...mapGetters(['getProductsFromNegocio']), // , 'getUserLoggedId']),
    products1() {
      return this.$store.dispatch('getProductsFromNegocio', parseInt(this.id, 10));
    },
    */
  },
};
</script>
<style scoped>
.contenedor {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
}
</style>
