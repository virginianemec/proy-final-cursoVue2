<template>
  <div>
    <h1>Mis negocios</h1>

    <div class="d-flex justify-content-beetween row">
      <div v-for="negocio in negocios" :key="negocio.id">
        <NegocioComponent
          :id="negocio.id"
          :name="negocio.name"
          :category="negocio.category"
          :carrito="carrito"
          :products="negocio.products"
          :ofertas="negocio.ofertas"
          :orders="negocio.orders"
          @carritoUpdate="carritoUpdate($event)"
        ></NegocioComponent>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import NegocioComponent from './NegocioComponent.vue';

export default {
  name: 'ListadoNegociosComponent',
  components: {
    NegocioComponent,
  },
  props: {
    carrito: [],
    negocios: [],
  },
  methods: {
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
  },
  data() {
    return {};
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
