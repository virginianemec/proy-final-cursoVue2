<template>
  <div class="div--container">
    <h1 class="text-center">CARRITO!</h1>
    <div class="row">
      <table class="table border-primary">
        <thead>
          <tr>
            <th>Cant. producto</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody v-for="(product,index) in carrito" :key="'product'+index">
          <RowProducto :product="product" />
        </tbody>
      </table>
      <div>Total: ${{ getTotal }}</div>
    </div>
  </div>
</template>

<script>
import RowProducto from '@/components/RowProducto.vue';

export default {
  name: 'CarritoComponent',
  components: {
    RowProducto,
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
    totalProductCalc(price, cant) {
      return price * cant;
    },
  },
  computed: {
    /*
    totalProducto(price, cant) {
      return price * cant;
    },
  */
    getTotal() {
      let total1 = 0;
      this.carrito.forEach((val) => {
        if (val.estado === 'PEND') {
          total1 += this.totalProductCalc(val.productPrice, val.cant);
        }
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
