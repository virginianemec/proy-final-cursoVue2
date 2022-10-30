<template>
  <div>
    <div class="encabezado">Mis negocios</div>
    <div>
      <div v-for="(negocio, index) in negocios" :key="index">
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

<style>
</style>
