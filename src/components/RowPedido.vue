<template>
  <div>
    <p>{{ usuario }}</p>
    <p>{{ nombre }}</p>
    <p>{{ fecha }}</p>
    <p>{{ total }}</p>
          {{detalle}}
  </div>
</template>

<script>
export default {
  name: 'RowPedido',
  // propiedades del pedido:
  props: {
    id: {
      type: Number,
      default: 0,
    },
    usuario: {
      type: String,
      default: 'Sin nombre',
    },
    fecha: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 0,
    },
    detalle: {
      type: Array,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>
