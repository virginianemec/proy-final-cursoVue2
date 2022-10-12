<template>
  <div>
    <table class="table border-primary">
      <thead>
        <th>Fecha</th>
        <th>Cant. / Descripción</th>
        <th>Precio</th>
        <th>Total</th>
      </thead>
      <tbody>
        <div v-for="order in orders" :key="order.id">
          <RowPedido :order="order"
          ></RowPedido>
        </div>
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
    back() {
      this.$emit('back');
    },
  },
  props: {
    orders: [],
  },
};
</script>
