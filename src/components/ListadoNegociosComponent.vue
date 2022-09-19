<template>
  <div>
    <h1>Mis negocios</h1>

    <div class="d-flex justify-content-beetween row">
      <div v-for="negocio in negocios" :key="negocio.id">
        <NegocioComponent
          :id="negocio.id"
          :nombre="negocio.nombre"
          :categoria="negocio.categoria"
          :carrito="carrito"
          :productos="negocio.productos"
          :ofertas="negocio.ofertas"
          :pedidos="negocio.pedidos"
          @modificarCarrito="modificarCarrito($event)"
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
    modificarCarrito(obj) {
      this.$emit('modificarCarrito', obj);
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
