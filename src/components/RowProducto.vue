<template>
  <tr>
    <td>
      <p>{{ this.displayProduct }}</p>
    </td>
    <td>$ {{ this.product.productPrice }}</td>
    <td>$ {{ this.total }}</td>
  </tr>
</template>

<script>
export default {
  name: 'ProductoObject',
  props: {
    product: {},
  },
  computed: {
    displayProduct() {
      return ` ${this.product.cant} ${this.product.productName}`;
    },
    total() {
      return this.product.cant * this.product.productPrice;
    },
  },
};
</script>
