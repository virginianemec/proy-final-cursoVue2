<template>
 <!-- <div class="container"> -->
  <div>
    <h1 class="encabezado">CARRITO!</h1>
    <div class="row">
      <table class="table border-primary">
        <thead>
          <tr>
            <th>Cant. producto</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody  v-for="(product,index) in carrito" :key="index">
           <tr  v-if="isPend(product)">
            <td>
              <p>{{ displayProduct(product) }}</p>
            </td>
            <td>$ {{ product.productPrice }}</td>
            <td>$ {{ totalProduct(product) }}</td>
            <td>
              <CountComponent :cantInicial="product.cant" :id="product.productId"
              :price="product.productPrice" :name="product.productName" :negocio="product.negocio"
               @carritoUpdate="carritoUpdate($event)"></CountComponent>
            </td>
          </tr>
        </tbody>
      </table>
      <div>Total: ${{ getTotal }}</div>
    </div>
    <button
      :style="isThereAny"
      type="button"
      class="btn btn-primary"
      :disabled="btnIsDisabled"
      @click="reset()"
    >Vaciar carrito</button>

    <button :style="isThereAny" type="button"
    :disabled="btnIsDisabled"
    class="btn btn-primary"
    @click="comprar()">Comprar</button>

    <div v-show="mostrarFormCompra">
        <!-- form para comprar-->
        <CompraForm @onCancel="onCancel($event)"
          @aceptarComprar="aceptarComprar($event)"
          :total="this.getTotal"></CompraForm>
    </div>

     <!-- <b-loading :show="loading"></b-loading>
      <b-spinner v-model="loading" label="Cargando..."></b-spinner> -->
      <div v-if="loading" >
        <div class="loader"></div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CountComponent from '@/components/CountComponent.vue';
import CompraForm from './CompraForm.vue';

export default {
  name: 'CarritoComponent',
  components: {
    CompraForm,
    CountComponent,
  },
  beforeMount() {
    this.actualizarCarrito();
  },
  data() {
    return {
      loading: false,
      mostrarFormCompra: false,
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
      // await this.$store.dispatch('carritoUserFromApi', this.userId);
    },
    onCancel() {
      console.log('User cancelled the loader.');
      this.mostrarFormCompra = false;
    },
    async aceptarComprar() {
      this.loading = true;
      await this.$store.dispatch('carritoComprarDevolver', { accion: 'comprar', userId: this.userId });
      // await this.$store.dispatch('carritoUserFromApi', this.userId);
      this.mostrarFormCompra = false;
      this.loading = false;
      this.$alert(
        'Gracias por tu compra!.',
        'Atención',
        'success',
      );
    },
    async comprar() {
      // this.$emit('comprar');
      // TODO: Probar esto.
      // await this.$store.dispatch('carritoComprar');
      // await this.$store.dispatch('updateNegocios');
      this.mostrarFormCompra = true;
    },
    async devolver() {
    // this.$emit('comprar');
      this.loading = true;
      await this.$store.dispatch('carritoComprarDevolver', { accion: 'devolver', userId: this.userId });
      // await this.$store.dispatch('carritoUserFromApi', this.userId);
      this.loading = false;
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
    // no se usa?
    async actualizarCarrito() {
      this.loading = true;
      // await this.$store.dispatch('carritoUserFromApi', this.userId);
      this.loading = false;
    },

    async carritoUpdate(objEvent) {
      this.total = objEvent.total;
      const objectdata = {
        productId: objEvent.productId,
        productPrice: objEvent.productPrice,
        productName: objEvent.productName,
        updateFuntion: objEvent.updateFuntion,
        userId: this.userId,
        negocio: objEvent.negocio,
      };
      if (objEvent.updateFuntion === '+') {
        await this.$store.dispatch('increase', objectdata);
      } else {
        await this.$store.dispatch('decrease', objectdata);
      }
      // await this.$store.dispatch('carritoUserFromApi', this.userId);
    },

  },
  computed: {
    ...mapGetters(['getCarrito', 'getUserLoggedId']), // , 'getNegocios']),
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    carrito() {
      // this.actualizarCarrito();
      return this.$store.getters.getCarrito;
    },
    isThereAny() {
      // checks whether an element is even
      const isPend = (item) => item.estado === 'PENDIENTE';
      return this.carrito.some(isPend) ? 'display' : 'display:none';
    },

    getTotal() {
      let total1 = 0;
      this.carrito.forEach((val) => {
        if (val.estado === 'PENDIENTE') {
          total1 += this.totalProductCalc(val.productPrice, val.cant);
        }
      });
      return total1;
    },
    btnIsDisabled() {
      return this.mostrarFormCompra;
    },
    mostrarLoading() {
      return this.loading ? 'display:block' : 'display:none';
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
