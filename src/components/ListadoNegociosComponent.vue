<template>
  <div class="container">
    <h1>Mis negocios</h1>

    <div class="d-flex justify-content-beetween row">
      <div v-for="negocio in negocios" :key="negocio.id">
        <NegocioComponent
          :id="negocio.id"
          :name="negocio.name"
          :category="negocio.category"
          :ofertas="negocio.ofertas"
          :orders="negocio.orders"
        ></NegocioComponent>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NegocioComponent from './NegocioComponent.vue';

export default {
  name: 'ListadoNegociosComponent',
  components: {
    NegocioComponent,
  },
  computed: {
    ...mapGetters(['getNegocios']),
    negocios() {
      return this.$store.getters.getNegocios;
    },
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
