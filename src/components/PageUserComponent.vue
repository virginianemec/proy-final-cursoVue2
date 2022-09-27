<!-- eslint-disable indent -->
<template>
  <div>
    <ListadoNegociosComponent
      :negocios='negocios'
      @carritoUpdate='carritoUpdate($event)'
    />

    <aside>
      <CarritoComponent :carrito='carrito' />
    </aside>
    <button type='button' class='btn btn-primary' @click='reset()'>
      Vaciar carrito
    </button>

     <button type='button' class='btn btn-primary' @click='comprar()'>
      Comprar
    </button>
  </div>
</template>

<script>
import ListadoNegociosComponent from '@/components/ListadoNegociosComponent.vue';
import CarritoComponent from '@/components/CarritoComponent.vue';

export default {
  name: 'PageUserComponent',
  components: {
    ListadoNegociosComponent,
    CarritoComponent,
  },
  data() {
    return {
      URL: 'https://632ba1f21aabd8373989647d.mockapi.io/negocios',
      negocios: [],
    };
  },
  props: {
    /* estas props son ahora data, en funcion del user param. Las cargo en created.
    carrito: [],
    negocios: [],
    */
    carrito: [],
    user: null,
  },
  methods: {
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
    reset() {
      this.$emit('reset');
    },
    comprar() {
      this.$emit('comprar');
    },
    async cargarProps() {
      await this.axios
        .get(this.URL)
        .then((response) => { this.negocios = response.data; })
        .catch((err) => {
          console.log('error', err);
        })
        .finally(() => console.log('Peticion terminada'));
    },
  },
  created() {
    this.cargarProps();
  },
};
</script>

<style>
</style>
