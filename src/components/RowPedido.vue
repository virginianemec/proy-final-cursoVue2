<template>
  <div>
    <p>{{ user }}</p>
    <p>{{ name }}</p>
    <p>{{ date }}</p>
    <p>{{ total }}</p>
    {{ detail }}
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
    user: {
      type: String,
      default: 'Sin nombre',
    },
    date: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 0,
    },
    detail: {
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
