<template>
  <div>
    <table class='table border-primary'>
      <tbody>
        <tr v-for='order in orders' :key='order.id'>
          <RowPedido
            :name='order.name'
            :price='order.total'
            :user='order.user'
            :date='order.date'
            :details='order.details'
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
    back() {
      this.$emit('back');
    },
  },
  props: {
    orders: [],
  },
};
</script>

<style scoped>
</style>
