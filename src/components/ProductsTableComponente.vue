<!-- eslint-disable vue/no-multiple-template-root -->
<template>
  <div>
    <div v-if="isAnyProduct">
       <div> <!-- class="div--container-->
        <div>LISTADO DE PRODUCTOS</div>

        <table >
          <thead>
            <tr >
              <th>ID</th>
              <th>NOMBRE</th>
              <th>PRECIO</th>
              <th>CATEGORIA</th>
              <th>A LA VENTA?</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody v-for="(product, index) in products" :key="index">
            <tr>
              <td >{{ product.id }}</td>
              <td >{{ product.name | nameFilter(product.name) }}</td>
              <td >{{ product.price | priceFilter(product.price) }}</td>
              <td >{{ product.category | categoryFilter }}</td>
              <td >{{ product.activo | isActivo(product.activo) }}</td>
              <td>
                <button v-on:click="productUpdate(product)">Update</button>
                <button v-on:click="productDelete(product)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>" ---- NO HAY PRODUCTOS PARA MOSTRAR ------ "</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductsTableComponente',
  filters: {
    nameFilter(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    },
    priceFilter(value) {
      if (!value) return '$ No asignado.';
      return `$ ${value}`;
    },
    isActivo(value) {
      return value === 1 ? 'SI' : 'NO';
    },
  },
  methods: {
    async reset() {
      // metodo para vaciar el listado.
      await this.$store.dispatch('productsReset');
    },
    productUpdate(prod) {
      console.log(`${prod.id}`);
      this.$emit('productController', { function: 'update', product: prod });
    },
    productDelete(prod) {
      console.log(` ${prod.id}`);
      this.$emit('productController', { function: 'delete', product: prod });
    },
  },
  computed: {
    ...mapGetters('products', ['getProducts', 'getProductsLength']),
    products() {
      return this.$store.getters.getProducts;
    },
    isAnyProduct() {
      return this.$store.getters.getProductsLength > 0;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
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
  /* padding: 10px; */
  border: 1px solid #ccc;
  text-align: left;
  font-size: 12x;
}
th {
  /* padding: 10px; */
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
