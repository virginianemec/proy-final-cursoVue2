<template>
  <tr>
    <td>
      <p>{{ this.displayProduct }}</p>
    </td>
    <td>$ {{ this.product.price }}</td>
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
      return ` ${this.product.cant} ${this.product.name}`;
    },
    total() {
      return this.product.cant * this.product.price;
    },
  },
};
</script>
