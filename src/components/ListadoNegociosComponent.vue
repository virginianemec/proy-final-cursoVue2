<template>
  <div>
    <h1>Mis negocios</h1>

    <div class='d-flex justify-content-beetween row'>
      <div v-for='negocio in negocios' :key='negocio.id'>
        <NegocioComponent
          :id='negocio.id'
          :name='negocio.name'
          :category='negocio.category'
          :ofertas='negocio.ofertas'
          :orders='negocio.orders'
          @carritoUpdate='carritoUpdate($event)'
        ></NegocioComponent>
        <!--  No mando el carrito
                     :carrito='carrito'
          Los produstos los busco en el negocio por el id.
          :products='productosFromApi'-->
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import NegocioComponent from './NegocioComponent.vue';

export default {
  name: 'ListadoNegociosComponent',
  components: {
    NegocioComponent,
  },
  props: {
    carrito: [],
    negocios: [],
  },
  methods: {
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
  },
  created() {
    // this.getProductos();
  },
  data() {
    return {
      // productosFromApi: [],
      // url: 'https://632ba1f21aabd8373989647d.mockapi.io/productos',
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 20px;
  color: #dd845a;
}
</style>
