<template>
  <div>
    <table>
      <tr>
        <th colspan="2">{{ nombre }}</th>
      </tr>
      <tr>
        <td colspan="2">
          <img :src="getImagenSrc" alt="article image" />
        </td>
      </tr>
      <tr>
        <th>Código</th>
        <td>: {{ id }}</td>
      </tr>
      <tr>
        <th>Precio</th>
        <td>: ${{ precio }}</td>
      </tr>
      <tr>
        <td colspan="2">
          <CountComponent :cantidad="cantidad" :precio="precio"> </CountComponent>
        </td>
      </tr>
    </table>
  </div>
</template>
<!--

  <div class="margin border">
    <h3>{{ nombre }}</h3>
    no <img alt="Mi app de Comidas!" src="getImagenSrc()" />
    <div class="d-flex justify-content-between">
      <span>#{{ precio }}</span>
      no <span>{{cantidad}}</span>
      <CountComponent :cantidad="cantidad" :precio="precio"> </CountComponent>
    </div>
  </div>
</template>
-->

<script>
import CountComponent from '@/components/CountComponent.vue';

export default {
  name: 'CardProducto',
  // propiedades del producto:
  props: {
    id: {
      type: Number,
      default: 0,
    },
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
      default: '../assets/No-image-available.png',
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
    return {};
  },
  computed: {
    getImagenSrc() {
      return `../assets/${this.imagen}/.png`;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
