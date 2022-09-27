<template>
  <div class='div--container'>
    <h1 class='text-center'>CARRITO!</h1>
    <div class='row'>
      <table class='table border-primary'>
        <thead>
          <tr>
            <th>Cant. producto</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody v-for='(product,index) in carrito' :key="'product'+index">
          <ProductoObject :product='product' />
        </tbody>
      </table>
      <div>Total: ${{ getTotal }}</div>
    </div>
  </div>
</template>

<script>
import ProductoObject from '@/components/RowProducto.vue';

export default {
  name: 'CarritoComponent',
  components: {
    ProductoObject,
  },
  props: {
    carrito: [],
  },
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    // TODO: pasar nombres metohos a ingles
    calcularTotalProducto(price, cant) {
      return price * cant;
    },
  },
  computed: {
    totalProducto(price, cant) {
      return price * cant;
    },
    getTotal() {
      let total1 = 0;
      this.carrito.forEach((val) => {
        total1 += this.calcularTotalProducto(val.productPrice, val.cant);
      });
      return total1;
    },
  },
};
</script>

<style scoped>
.div--container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-top: 20px;
}
</style>
