<template>
  <div>
    <div class="encabezado">{{ titulo }}!</div>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Cant.</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody v-for="(order, index) in orders" :key="index">
        <tr>
          <td>
            {{ order.createdAt | dataFilter(order.createdAt) }}
            {{ usuario(order) }}
          </td>
          <td>{{ order.cant }}</td>
          <td>
            <p>{{ displayOrder(order) }}</p>
          </td>
          <td>$ {{ order.productPrice }}</td>
          <td>
            <strong>$ {{ totalPrice(order) }} </strong>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!isThereOrders">
        <tr>
          <td colspan="5" style="text-align: center">
            ---- NO HAY PEDIDOS PARA MOSTRAR ----
          </td>
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
      return order.productName;
    },
    usuario(order) {
      return this.isAdmin && this.allOrders ? `|| ${order.userName}` : '';
    },
  },
  props: {
    orders: [],
    titulo: String,
    isAdmin: Boolean,
    allOrders: Boolean,
  },
  computed: {
    isThereOrders() {
      return this.orders.length > 0;
    },
  },
};
</script>

<style scoped>
table {
  width: 750px;
  border-collapse: collapse;
  margin: 10px auto;
}

/* Zebra striping */
tr:nth-of-type(odd) {
  background: #eee;
}

th {
  background: rgb(236, 185, 90);
  color: white;
  font-weight: bold;
}

td {
  border: 1px solid #ccc;
  text-align: left;
  font-size: 12x;
}
th {
  border: 1px solid #ccc;
  text-align: left;
  font-size: 15px;
}

tfoot td {
  background: rgb(236, 185, 90);
  color: white;
  font-weight: bold;
}
</style>
