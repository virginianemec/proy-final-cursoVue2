<template>
  <div>
    <table class='table border-primary'>
      <tbody>
        <tr v-for='negocio in negocios' :key='negocio.id'>
          <NegocioComponent
            :id='negocio.id'
            :nombre='negocio.nombre'
            :categoria='negocio.categoria'
          ></NegocioComponent>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import NegocioComponent from './NegocioComponent.vue';

export default {
  name: 'ListadoNegociosComponent',
  components: {
    NegocioComponent,
  },
  props: {},
  methods: {
    atras() {
      this.$emit('volver');
    },
  },
  data() {
    return {
      negocios: [
        {
          id: 1,
          nombre: 'Morena',
          categoria: 'Food Natural',
          pedidos: [],
          productos: [],
          ofertas: [],
        },
      ],
    };
  },
};
</script>

<style>
</style>
