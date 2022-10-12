<template>
  <article>
    <div class="div--container">
      Bienvenido {{ userName }} ||
      <router-link :to="{ name: 'Login' }">Cerrar Session</router-link>||
      <div v-if="isAdmin">
        <router-link :to="{ name: 'Productos' }">ABM Productos</router-link> ||
      </div>
      <div v-else>
        <p>
          El usuario logueado no es Admin..
          <br />por ello no aparece la opción ABM Productos. ||
        </p>
      </div>
      <router-link :to="{ name: 'Pedidos' }">{{tituloPedidos}}</router-link>||
      <router-link :to="{ name: 'Carrito' }"> Ver Carrito</router-link>||
    </div>
    <PageUserComponent
      @reset="reset()"
      @comprar="comprar()"
    ></PageUserComponent>
    <!-- :carrito="carrito"  @carritoUpdate="carritoUpdate($event)"-->
  </article>
</template>

<script>
import { mapGetters } from 'vuex';
import PageUserComponent from '@/components/PageUserComponent.vue';

export default {
  components: {
    PageUserComponent,
  },
  created() {
    // this.carritoUserFromApi();
  },
  data() {
    return {
    };
  },
  methods: {

    async carritoUserFromApi() {
      await this.$store.dispatch('carritoUserFromApi', this.userId);
    },
    async carritoUpdate(objProdCant) {
      await this.$store.dispatch('updateCarrito', objProdCant, this.userId);
      await this.carritoUserFromApi();
    /*
     if (objProdCant.updateFuntion === '+') {
        this.increase(objProdCant);
      } else {
        this.decrease(objProdCant);
      }
      */
    },
    /*
    async increase(objEvento) {
      console.log(objEvento);
      const obj = this.carrito.find((val) => val.productId === objEvento.productId);
      if (obj) {
        if (obj.cant >= 0) {
          obj.cant += 1;
        }
        const idProducto = obj.id;
        await this.axios
          .put(`${this.urlCarrito}/${idProducto}`, obj)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const productToCarrito = {
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          user: this.userId,
          cant: 1,
          createdAt: new Date(),
          estado: 'PENDIENTE',
        };

        console.log('id - price', objEvento.productId, objEvento.productPrice);

        await this.axios
          .post(`${this.urlCarrito}/`, productToCarrito)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      await this.carritoUserFromApi();
    },
    async decrease(objEvento) {
      const obj = this.carrito.find((val) => val.productId === objEvento.productId);
      if (obj) {
        if (obj.cant > 1) {
          obj.cant -= 1;
          const idProducto = obj.id;
          await this.axios
            .put(`${this.urlCarrito}/${idProducto}`, obj)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('id - price', objEvento.productId, objEvento.productPrice);
          const idProducto = obj.id;
          await this.axios
            .delete(`${this.urlCarrito}/${idProducto}`)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      await this.carritoUserFromApi();
    },
    */
    async reset() {
      await this.$store.dispatch('resetCarritoUser', this.userId);
      // no funciona bien pues en pantalla no reinicia los countComponents
      // IVAN: no puedo manejar la sincro. El sistema busca el carrito (carritoUserFromApi)
      // antes de terminar todas las iteraciones.
      // La idea es eliminar el renglon del carrito (Solo los PENDIENTE).
      /*
      await this.carrito.forEach(async (val) => {
        const idCarrito = val.id;
        // if (val.estado === 'PENDIENTE') {
        await this.axios
          .delete(`${this.urlCarrito}/${idCarrito}`)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        // }
      });
      */
      await this.carritoUserFromApi();
    },
    async comprar() {
      // llamar al store para que compre el carrito.
      await this.$store.dispatch('carritoComprarDevolver', 'comprar');
      /*
      await this.carrito.forEach(async (val) => {
        val.estado = 'COMPRADO';
        console.log(val);
        const idCarrito = val.id;
        await this.axios
          .put(`${this.urlCarrito}/${idCarrito}`, val)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
      */
      await this.carritoUserFromApi();
    },
  },
  computed: {
    ...mapGetters(['isAdmin', 'getUserLoggedId', 'getUserLoggedName']), // , 'getUserCarrito']),
    /*
    carrito() {
      return this.$store.getters.getUserCarrito;
    },
    */
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    userName() {
      return this.$store.getUserLoggedName;
    },
    tituloPedidos() {
      return (this.$store.getters.isAdmin) ? 'Ver Todos los Pedido' : 'Mis Pedidos';
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
