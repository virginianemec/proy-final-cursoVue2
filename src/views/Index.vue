<template>
  <article>
    <nav>
      <router-link :to="{ name: 'Login' }">Cerrar Session</router-link>
      <br />
      <router-link :to="{ name: 'Login' }"
        >Ver Carrito - no anda aun</router-link
      >
      <br />
      <div v-if="isAdmin">
        <router-link :to="{ name: 'Productos' }">ABM Productos</router-link>
      </div>
    </nav>
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
          // this.carrito.push(response.data.forEach((item) => { item.estado === 'PEND'; }));

          // this.carrito.push(response.data.filter((item) => item.estado === 'PEND'));
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
      const obj = this.carrito.find(
        (val) => val.productId === objEvento.productId,
      );
      if (obj) {
        if (obj.cant >= 0) {
          obj.cant += 1;
        }
        const idProducto = obj.id;
        await this.axios.put(`${this.urlCarrito}/${idProducto}`, obj)
        // await this.axios.put(this.urlCarrito, obj)
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

        await this.axios.post(`${this.urlCarrito}/`, productToCarrito)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.carritoGetFromUser();
    },
    async decrease(objEvento) {
      const obj = this.carrito.find(
        (val) => val.productId === objEvento.productId,
      );
      if (obj) {
        if (obj.cant > 1) {
          obj.cant -= 1;
          const idProducto = obj.id;
          await this.axios.put(`${this.urlCarrito}/${idProducto}`, obj)
          // await this.axios.put(this.urlCarrito, obj)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        // put
        } else {
          console.log(
            'id - price',
            objEvento.productId,
            objEvento.productPrice,
          );
          const idProducto = obj.id;
          await this.axios.delete(`${this.urlCarrito}/${idProducto}`)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        // delete
        }
      }
      this.carritoGetFromUser();
    },
    async reset() {
      // no funciona bien pues en pantalla no reinicia los countComponents
      // this.carrito = [];
      this.carrito.forEach(
        async (val) => {
          const idCarrito = val.id;
          await this.axios.delete(`${this.urlCarrito}/${idCarrito}`)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      );
      this.carritoGetFromUser();
    },
    async comprar() {
      this.carrito.forEach(
        async (val) => {
          val.estado = 'PEDIDO';
          console.log(val);
          const idCarrito = val.id;
          await this.axios.put(`${this.urlCarrito}/${idCarrito}`, val)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      );
      this.carritoGetFromUser();
    },
  },
  computed: {
    isAdmin() {
      if (this.user) return this.user.rol === 'admin';
      return false;
    },
    userId() {
      if (this.user) return parseInt(this.user.id);
      return 1;
    },
  },
};
</script>

<style>
</style>
