<template>
  <div>
    <p>{{ nombre }}</p>
    <p>{{ precio }}</p>

    <CountComponent :cantidad="cantidad" :precio="precio"> </CountComponent>
  </div>
</template>

<script>
import CountComponent from '@/components/CountComponent.vue';

export default {
  name: 'CardProducto',
  // propiedades del producto:
  props: {
    nombre: {
      type: String,
      default: 'Sin nombre',
    },
    precio: {
      type: Number,
      default: 0,
    },
    imagen: {
      stype: String,
      default: 'No-image-available',
    },
    // creo  que necesitare inicializar la cantidad en caso de edit.
    cantidad: {
      type: Number,
      default: 0,
    },
  },
  components: {
    CountComponent,
  },
  data() {

  },
  methods: {
    getImagenSrc() {
      return `./assets/${this.imagen}/.png`;
    },
  },
};
</script>

<style>
</style>
