<template>

<div class="margin border">
    <h3>{{nombre}}</h3>
    <img src={{imagen}} alt=""/>
    <div class="d-flex justify-content-between">
        <span>#{{precio}}</span>
        <!--<span>{{product.cantidad}}</span>-->
        <CountComponent :cantidad="cantidad" :precio="precio"> </CountComponent>
    </div>
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
      default: './assets/No-image-available.png',
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
  computed: {
    getImagenSrc() {
      return `./assets/${this.imagen}/.png`;
    },
  },
  methods: {},
};
</script>

<style>
</style>
