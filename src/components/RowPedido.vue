<template>
    <tr>
      <td>{{this.order.createdAt}}</td>
    <td>
      <p>{{ this.displayOrder }}</p>
    </td>
    <td> $ {{ this.order.productPrice }}</td>
    <td> <strong>$ {{ this.totalPrice }} </strong></td>
  </tr>
</template>

<script>
export default {
  name: 'RowPedido',
  // propiedades del COMPRADO:
  props: {
  /*
   cant: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'Sin nombre',
    },
    date: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    detail: {
      type: Array,
    },
    */
    order: {},
  },
  data() {
    return {};
  },
  computed: {
    totalPrice() {
      return this.order.cant * parseFloat(this.order.productPrice);
    },
    displayOrder() {
      return ` ${this.order.cant} ${this.order.productName} `;
    },
  },
};
</script>
