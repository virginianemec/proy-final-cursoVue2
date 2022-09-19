<template>
  <div>
    <div v-for='oferta in ofertas' :key='oferta.id'>
      <!--<CardOferta
        :id='oferta.id'
        :nombre='oferta.nombre'
        :precio='oferta.precio'
        :imagen='oferta.imagen'
        :cantidad='oferta.cantidad'
      >
        ></CardOferta> -->
      {{ oferta }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListadoOfertasComponent',
  components: {},
  props: {
    ofertas: [],
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$emit('back');
    },
  },
};
</script>
<style scoped></style>
