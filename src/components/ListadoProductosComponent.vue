<template>
    <div>
        <table class="table border-primary">

        <tbody >
          <tr v-for="pedido in pedidos" :key="pedido.id">
          <CardProducto :nombre="pedido.obs" :precio="pedido.id"></CardProducto></tr>
        </tbody>
      </table>

    </div>
  </template>

<script>
import CardProducto from '@/components/CardProducto.vue';

export default {
  name: 'ListadoProductosComponent',
  components: {
    CardProducto,
  },
  data() {
    return {

    };
  },
  methods: {
    atras() {
      this.$emit('volver');
    },
  },
};
</script>

<style>

</style>
