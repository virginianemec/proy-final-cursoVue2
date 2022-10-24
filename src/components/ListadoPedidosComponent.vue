<template>
  <div>
    <!--   <h1 class="text-center">{{titulo}}!</h1> -->
     <div class="encabezado">{{titulo}}!</div>
    <table class="table border-primary">
      <thead>
        <th>Fecha</th>
        <th>Cant. / Descripción</th>
        <th>Precio</th>
        <th>Total</th>
      </thead>
      <tbody v-for="order in orders" :key="order.id">
        <tr>
          <td>{{ order.createdAt  | userFilter(order.createdAt)}}</td>
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
  name: 'ListadoPedidosComponent',
  methods: {
    totalPrice(order) {
      return order.cant > 0 ? order.cant * parseFloat(order.productPrice) : 0;
    },
    displayOrder(order) {
      return ` ${order.cant} ${order.productName} `;
    },
  },
  filters: {
    userFilter(value) {
      value = value.toString();
      const arrayDate = value.split('T')[0].split('-');
      // const hora = value.split('T')[1];
      return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
    },
  },
  props: {
    orders: [],
    titulo: String,
  },
};
</script>
