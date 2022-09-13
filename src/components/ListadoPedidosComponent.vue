<template>
    <div>
        <table class="table border-primary">

        <tbody >
          <tr v-for="pedido in pedidos" :key="pedido.id">
          <CardPedido :nombre="pedido.obs" :precio="pedido.id"></CardPedido></tr>
        </tbody>
      </table>

      <div >
      <button type='button' class='btn btn-primary' @click='atras()'>Volver</button>
    </div>
    </div>
  </template>

<script>
import CardPedido from '@/components/CardPedido.vue';

export default {
  name: 'ListadoPedidosComponent',
  components: {
    CardPedido,
  },
  data() {
    return {
      pedidos: [
        {
          id: 1,
          obs: '',
          detalle: [{
            prodId: 1, prodName: 'Tostada', prodPrecio: 270,
          }],
        },
        {
          id: 2,
          obs: '',
          detalle: [{
            prodId: 1, prodName: 'Gaseosa', prodPrecio: 180,
          }],
        },
      ],
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
