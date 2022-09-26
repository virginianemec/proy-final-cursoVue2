<template>
  <article>
    <nav>
      <router-link :to="{ name: 'Login'}">Cerrar Session</router-link>
      <br />
      <router-link :to="{ name: 'Login'}">Ver Carrito - no anda aun</router-link>
      <br />
      <div v-if="isAdmin">
        <router-link :to="{name: 'Productos'}">ABM Productos</router-link>
      </div>
    </nav>
    <PageUserComponent @carritoUpdate="carritoUpdate($event)" 
    @reset="reset()" :user="user"></PageUserComponent>
  </article>
</template>

<script>
import PageUserComponent from '@/components/PageUserComponent.vue';

export default {
  components: {
    PageUserComponent,
  },
  data() {
    return {
      user: this.$route.query.user,
    };
  },
  computed: {
    isAdmin() {
      if (this.user) return this.user.rol === 'admin';
      return false;
    },
    carritoUpdate(objProdCant) {
      if (objProdCant.updateFuntion === '+') {
        this.increase(objProdCant);
      } else {
        this.decrease(objProdCant);
      }
    },
    increase(objEvento) {
      const obj = this.carrito.find((val) => val.id === objEvento.id);
      if (obj) {
        if (obj.cant >= 0) {
          obj.cant += 1;
        }
      } else {
        console.log('id - price', objEvento.id, objEvento.price);
        this.carrito.push({
          id: objEvento.id,
          name: objEvento.name,
          price: objEvento.price,
          cant: 1,
        });
      }
    },
    decrease(objEvento) {
      const obj = this.carrito.find((val) => val.id === objEvento.id);
      if (obj) {
        if (obj.cant > 1) {
          obj.cant -= 1;
        } else {
          console.log('id - price', objEvento.id, objEvento.price);
          const indexOfObject = this.carrito.findIndex((object) => object.id === objEvento.id);
          this.carrito.splice(indexOfObject, 1);
        }
      }
    },
    reset() {
      // no funciona bien pues en pantalla no reinicia los countComponents
      this.carrito = [];
    },
  },
};
</script>

<style>
</style>
