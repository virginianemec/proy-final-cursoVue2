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
export default {
  name: "ListadoPedidosComponent",
  methods: {
    totalPrice(order) {
      return order.cant > 0 ? order.cant * parseFloat(order.productPrice) : 0;
    },
    displayOrder(order) {
      return ` ${order.cant} ${order.productName} `;
    },
  },
  props: {
    orders: [],
    titulo: String,
  },
};
</script>
