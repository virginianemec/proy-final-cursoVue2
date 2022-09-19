<template>
  <tr>
    <td>
      <p>{{ this.displayProduct }}</p>
    </td>
    <td>$ {{ this.producto.precio }}</td>
    <td>$ {{ this.total }}</td>
  </tr>
</template>

<script>
export default {
  name: 'ProductoObject',
  props: {
    producto: {},
  },
  computed: {
    displayProduct() {
      return ` ${this.producto.cantidad} ${this.producto.nombre}`;
    },
    total() {
      return this.producto.cantidad * this.producto.precio;
    },
  },
};
</script>

<style>
</style>
