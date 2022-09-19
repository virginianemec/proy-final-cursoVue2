<template>
  <div class='coder--header'>
    <div class="title">PediSalud</div>
    <div class="title">¡Nuestra web de comidas saludables!</div>
    <div v-if='buttonReturnShowInHeader'>
      <button type='button' class='btn btn-primary' @click='back()'>Cerrar Sesión</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  props: {
    buttonReturnShowInHeader: Boolean,
  },
  methods: {
    back() {
      this.$emit('back');
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
    color: #dd845a;
}
.title {
  text-align: center;
  padding: 20px;
  font-weight: bold;
  color: #504c4c;
  color: #1a1919;
    font-size: calc(1.5rem + 1.5vw);
}
</style>
