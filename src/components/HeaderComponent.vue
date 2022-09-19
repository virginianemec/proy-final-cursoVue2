<template>
  <div class='coder--header'>
    <h1>PediSalud</h1>
    <h1>¡Nuestra web de comidas saludables!</h1>
    <div v-if='this.mostrarVolverEnNavBar'>
      <button type='button' class='btn btn-primary' @click='atras()'>
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  props: {
    mostrarVolverEnNavBar: Boolean,
  },
  methods: {
    atras() {
      this.$emit('volver');
    },
  },
};
</script>
<style scoped>
.coder--header {
  width: 100%;
  background-image: url('../assets/logo.png');
  background-size: cover;
  background-position: center;
}
h1 {
  text-align: center;
  padding: 20px;
}
</style>
