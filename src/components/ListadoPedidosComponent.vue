<template>
  <div>
    <table class="table border-primary">
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.id">
          <RowPedido
            :nombre="pedido.nombre"
            :precio="pedido.total"
            :usuario="pedido.usuario"
            :fecha="pedido.fecha"
            :detalle="pedido.detalle"
          ></RowPedido>
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
    return {};
  },
  methods: {
    atras() {
      this.$emit('volver');
    },
  },
  props: {
    pedidos: [],
  },
};
</script>

<style scoped>
</style>
