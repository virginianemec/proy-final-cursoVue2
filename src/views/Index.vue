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
      :user="user"
    ></PageUserComponent>
  </article>
</template>

<script>
import PageUserComponent from "@/components/PageUserComponent.vue";

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
      urlCarrito: "https://632ba1f21aabd8373989647d.mockapi.io/carritos/",
    };
  },
  methods: {
    async carritoGetFromUser() {
      await this.axios
        .get(`${this.urlCarrito}?user=${this.userId}`)
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
      if (objProdCant.updateFuntion === "+") {
        this.increase(objProdCant);
      } else {
        this.decrease(objProdCant);
      }
    },
    async increase(objEvento) {
      const obj = this.carrito.find(
        (val) => val.productId === objEvento.productId,
      );
      if (obj) {
        if (obj.cant >= 0) {
          obj.cant += 1;
        }
      } else {
        console.log("id - price", objEvento.productId, objEvento.productPrice);
        const productToCarrito = {
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          user: this.userId,
          cant: 1,
          createdAt: new Date(),
        };
        await this.axios.post(this.urlCarrito, productToCarrito)
        .then((response) => {
          console.table(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        /*
        this.carrito.push({
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          user: this.userId,
          cant: 1,
          createdAt: new Date(),
        });
        */
       this.carritoGetFromUser();
      }
    },
    async decrease(objEvento) {
      const obj = this.carrito.find(
        (val) => val.productId === objEvento.productId,
      );
      if (obj) {
        if (obj.cant > 1) {
          obj.cant -= 1;
          // decrementar la cantidad y put del obj
          const productToCarrito = {
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          user: this.userId,
          cant: 1,
          createdAt: new Date(),
        };
        await this.axios.put(this.urlCarrito, productToCarrito)
        .then((response) => {
          console.table(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        //put 
        } else {
          console.log(
            "id - price",
            objEvento.productId,
            objEvento.productPrice,
          );
          const indexOfObject = this.carrito.findIndex(
            (object) => object.productId === objEvento.productId,
          );
          this.carrito.splice(indexOfObject, 1);

          //delete del carrito
          const productToCarrito = {
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          user: this.userId,
          cant: 1,
          createdAt: new Date(),
        };
        await this.axios.delete(this.urlCarrito, productToCarrito)
        .then((response) => {
          console.table(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        //delete
        }
      }
    },
    reset() {
      // no funciona bien pues en pantalla no reinicia los countComponents
      this.carrito = [];
    },
  },
  computed: {
    isAdmin() {
      if (this.user) return this.user.rol === "admin";
      return false;
    },
    userId() {
      if (this.user) return this.user.id;
      return 1;
    },
  },
};
</script>

<style>
</style>
