<template>
  <article>
    <div class="div--container">
      <router-link :to="{ name: 'Login' }">Cerrar Session</router-link>||
      <div v-if="isAdmin">
        <router-link :to="{ name: 'Productos' }">ABM Productos</router-link>
      </div>
      <div v-else>
        <p>
          El usuario logueado no es Admin..
          <br />por ello no aparece la opción ABM Productos.
        </p>
      </div>
    </div>
    <PageUserComponent
      @carritoUpdate="carritoUpdate($event)"
      :carrito="carrito"
      @reset="reset()"
      @comprar="comprar()"
      :user="user"
    ></PageUserComponent>
  </article>
</template>

<script>
import PageUserComponent from '@/components/PageUserComponent.vue';

export default {
  components: {
    PageUserComponent,
  },
  created() {
    this.carritoGetFromUser();
  },
  data() {
    return {
      user: this.$route.query.user,
      carrito: [],
      urlCarrito: 'https://632ba1f21aabd8373989647d.mockapi.io/carritos',
    };
  },
  methods: {
    async carritoGetFromUser() {
      this.axios
        .get(`${this.urlCarrito}/?user=${this.userId}`)
        .then((response) => {
          console.table(response.data);
          this.carrito = response.data;
        })
        .catch((error) => {
          this.carrito = [];
          console.log(error);
        });
    },
    carritoUpdate(objProdCant) {
      if (objProdCant.updateFuntion === '+') {
        this.increase(objProdCant);
      } else {
        this.decrease(objProdCant);
      }
    },
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
          estado: 'PEND',
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
      await this.carritoGetFromUser();
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
      await this.carritoGetFromUser();
    },
    async reset() {
      // no funciona bien pues en pantalla no reinicia los countComponents
      // IVAN: no puedo manejar la sincro. El sistema busca el carrito (carritoGetFromUser)
      // antes de terminar todas las iteraciones.
      // La idea es eliminar el renglon del carrito (Solo los PEND).
      await this.carrito.forEach(async (val) => {
        const idCarrito = val.id;
        // if (val.estado === 'PEND') {
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
      await this.carritoGetFromUser();
    },
    async comprar() {
      // IVAN: no puedo manejar la sincro. El sistema busca el carrito (carritoGetFromUser)
      // antes de terminar todas las iteraciones.
      // La idea es setear el renglon del carrito como PEDIDO,
      // para no mostrarlo como pendiente en pantalla.
      // Estos items luego pasarian al pedido del negocio dueño del producto. (Proxima entrega!)
      await this.carrito.forEach(async (val) => {
        val.estado = 'PEDIDO';
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
      await this.carritoGetFromUser();
    },
  },
  computed: {
    // IVAN: se nota que envio mal la propiedad en la ruta,
    // pues este parametro existe solo en ocasiones.
    // por eso en pantalla desaparece la opcion de ABM prodctos,
    // por que no puede verificar situacion de usuario.
    isAdmin() {
      if (this.user instanceof Object) return this.user.rol === 'admin';
      return false;
    },
    // IVAN: se nota que envio mal la propiedad en la ruta,
    // pues este parametro existe solo en ocasiones.
    // por eso en el carrito se guarda "user": NaN....
    userId() {
      if (this.user instanceof Object) return parseInt(this.user.id);
      return 1;
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
