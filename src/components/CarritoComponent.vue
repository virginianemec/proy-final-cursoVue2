<template>
  <!-- <div class="container"> -->
  <div>
    <h1 class="encabezado">CARRITO!</h1>
      <table>
        <thead>
          <tr>
            <th>Cant.</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="(product,index) in carrito" :key="index">
          <tr v-if="isPend(product)">
            <td> {{ product.cant }}</td>
            <td>
              <p>{{ displayProduct(product) }}</p>
            </td>
            <td class="moneyCell">$ {{ product.productPrice }}</td>
            <td class="moneyCell">$ {{ totalProduct(product) }}</td>
            <td>
              <CountComponent
                :cantInicial="product.cant"
                :id="product.productId"
                :price="product.productPrice"
                :name="product.productName"
                :negocio="product.negocio"
                @carritoUpdate="carritoUpdate($event)"
              ></CountComponent>
            </td>
          </tr>
        </tbody>
          <tbody v-if="!isThereAnyPendiente">
            <tr>
              <td colspan="5" style="text-align: center;"> ---- NO HAY COMPRAS PENDIENTES ---- </td>
            </tr>
          </tbody>
        <tfoot>
          <td colspan="3"><div class="moneyCell">Total: $</div></td>
          <td><div class="moneyCell">{{ getTotal }}</div></td>
          <td></td>
        </tfoot>
      </table>

    <div class="fila">
    <button
      :style="isThereAny"
      type="button"
      class="btn btn-primary"
      :disabled="btnIsDisabled"
      @click="reset()"
    >Vaciar carrito</button>

    <button
      :style="isThereAny"
      type="button"
      :disabled="btnIsDisabled"
      class="btn btn-primary"
      @click="comprar()"
    >Comprar</button>
  </div>
    <div v-show="mostrarFormCompra">
      <!-- form para comprar-->
      <CompraForm
        @onCancel="onCancel($event)"
        @aceptarComprar="aceptarComprar($event)"
        :total="this.getTotal"
      ></CompraForm>
    </div>

    <!-- <b-loading :show="loading"></b-loading>
    <b-spinner v-model="loading" label="Cargando..."></b-spinner>-->
    <div v-if="loading">
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
      await this.$store.dispatch('resetCarritoUser');
    },
    onCancel() {
      console.log('User cancelled the loader.');
      this.mostrarFormCompra = false;
    },
    async aceptarComprar() {
      this.loading = true;
      await this.$store.dispatch('carritoComprarDevolver', {
        accion: 'comprar',
        userId: this.userId,
      });
      this.mostrarFormCompra = false;
      this.loading = false;
      this.$alert('Gracias por tu compra!.', 'Atención', 'success');
    },
    async comprar() {
      this.mostrarFormCompra = true;
    },
    async devolver() {
      this.loading = true;
      await this.$store.dispatch('carritoComprarDevolver', {
        accion: 'devolver',
        userId: this.userId,
      });
      this.loading = false;
    },

    displayProduct(product) {
      return product.productName;
    },
    totalProduct(product) {
      return product.cant * product.productPrice;
    },
    isPend(product) {
      return product.estado === 'PENDIENTE';
    },

    async actualizarCarrito() {
      this.loading = true;
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
    },
  },
  computed: {
    ...mapGetters(['getCarrito', 'getUserLoggedId']),
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    carrito() {
      return this.$store.getters.getCarrito;
    },
    isThereAny() {
      const isPend = (item) => item.estado === 'PENDIENTE';
      return this.carrito.some(isPend) ? 'display' : 'display:none';
    },
    isThereAnyPendiente() {
      const isPend = (item) => item.estado === 'PENDIENTE';
      return !!this.carrito.some(isPend);
    },

    getTotal() {
      let total1 = 0;
      this.carrito.forEach((val) => {
        if (val.estado === 'PENDIENTE') {
          total1 += this.totalProductCalc(val.productPrice, val.cant);
        }
      });
      return total1 > 0 ? total1 : '';
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
