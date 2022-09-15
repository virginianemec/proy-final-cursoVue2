<template>
    <div>
        <table class="table border-primary">

        <tbody >
          <tr v-for="pedido in pedidos" :key="pedido.id">
          <RowPedido :nombre="pedido.nombre" :precio="pedido.total"
          :detalle="pedido.detalle"></RowPedido>
        </tr>
        </tbody>
      </table>

    </div>
  </template>

<script>
import RowPedido from '@/components/RowPedido.vue';

export default {
  name: 'ListadoPedidosComponent',
  components: {
    RowPedido,
  },
  data() {
    return {
      pedidos: [
        {
          id: 1,
          usuario: '',
          fecha: '',
          total: 0,
          detalle: [
            {
              id: 1,
              nombre: 'Tostada',
              precio: 270,
            },
          ],
        },
        {
          id: 2,
          usuario: '',
          fecha: '',
          total: 0,
          detalle: [
            {
              id: 1,
              nombre: 'Gaseosa',
              precio: 180,
            },
          ],
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
