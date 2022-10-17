<template>
  <div class="container">
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
        <tbody  v-for="(product,index) in carrito" :key="index">
        <!-- <div v-for="(product,index) in carrito" :key="index">
          <RowProducto :product="product" />
        </div> -->
          <tr  v-if="isPend(product)">
            <td>
              <p>{{ displayProduct(product) }}</p>
            </td>
            <td>$ {{ product.productPrice }}</td>
            <td>$ {{ totalProduct(product) }}</td>
          </tr>
        </tbody>
      </table>
      <div>Total: ${{ getTotal }}</div>
    </div>
    <button
      :style="isThereAny"
      type="button"
      class="btn btn-primary"
      @click="reset()"
    >Vaciar carrito</button>

    <button :style="isThereAny" type="button" class="btn btn-primary"
    @click="comprar()">Comprar</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import RowProducto from '@/components/RowProducto.vue';

export default {
  name: 'CarritoComponent',
  components: {
    // RowProducto,
  },
  props: {
    // carrito: [],
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
    async reset() {
      // this.$emit('reset');
      await this.$store.dispatch('resetCarritoUser');
      await this.$store.dispatch('carritoUserFromApi', this.userId);
    },
    async comprar() {
      // this.$emit('comprar');
      // TODO: Probar esto.
      // await this.$store.dispatch('carritoComprar');
      // await this.$store.dispatch('updateNegocios');
      await this.$store.dispatch('carritoComprarDevolver', { accion: 'comprar', userId: this.userId });
      await this.$store.dispatch('carritoUserFromApi', this.userId);
    },
    async devolver() {
    // this.$emit('comprar');
      await this.$store.dispatch('carritoComprarDevolver', { accion: 'devolver', userId: this.userId });
      await this.$store.dispatch('carritoUserFromApi', this.userId);
    },

    displayProduct(product) {
      return ` ${product.cant} ${product.productName}`;
    },
    totalProduct(product) {
      return product.cant * product.productPrice;
    },
    isPend(product) {
      return product.estado === 'PENDIENTE';
    },

  },
  computed: {
    ...mapGetters(['getCarrito', 'getUserLoggedId']), // , 'getNegocios']),
    /*
    negocios() {
      return this.$store.getters.getNegocios;
    },
    */
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    carrito() {
      return this.$store.getters.getCarrito;
    },
    isThereAny() {
      // checks whether an element is even
      const isPend = (item) => item.estado === 'PENDIENTE';
      return this.carrito.some(isPend) ? 'display' : 'display:none';
    },
    /*
    totalProducto(price, cant) {
      return price * cant;
    },
  */
    getTotal() {
      let total1 = 0;
      this.carrito.forEach((val) => {
        if (val.estado === 'PENDIENTE') {
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
