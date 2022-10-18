<template>
  <div class="container">
       <h1 class="text-center">{{titulo}}!</h1>
    <table class="table border-primary">
      <thead>
        <th>Fecha</th>
        <th>Cant. / Descripción</th>
        <th>Precio</th>
        <th>Total</th>
      </thead>
      <tbody v-for="order in orders" :key="order.id">
        <!-- <div v-for="order in orders" :key="order.id">
          <RowPedido :order="order"
          ></RowPedido>
        </div> -->
        <tr>
          <td>{{ order.createdAt }}</td>
          <td><p>{{ displayOrder(order) }}</p></td>
          <td>$ {{ order.productPrice }}</td>
          <td> <strong>$ {{ totalPrice(order) }} </strong>  </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import RowPedido from "@/components/RowPedido.vue";

export default {
  name: "ListadoPedidosComponent",
  components: {
    // RowPedido,
  },
  data() {
    return {};
  },
  methods: {
    /*
    back() {
      this.$emit('back');
    },
    */
    totalPrice(order) {
      return order.cant * parseFloat(order.productPrice);
    },
    displayOrder(order) {
      return ` ${order.cant} ${order.productName} `;
    },
  },
  props: {
    orders: [],
    titulo: String,
  },
  computed: {

  },
};
</script>
