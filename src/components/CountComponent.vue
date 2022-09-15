<template>
  <div>
    <button @click="decrementar()">-</button>
    <p>{{ cantidad }}</p>
    <button @click="aumentar()">+</button>
  </div>
</template>

<script>
export default {
  name: 'CountComponent',
  props: {
    cantidadInicial: {
      type: Number,
      default: 0,
    },
    precio: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      total: 0,
      cantidad: 0,
    };
  },
  created() {
    this.cantidad = this.cantidadInicial;
  },
  methods: {
    aumentar() {
      if (this.cantidad >= 0) this.cantidad += 1;
    },
    decrementar() {
      if (this.cantidad > 0) this.cantidad -= 1;
    },
    resetear() {
      this.cantidad = 0;
    },
  },
  computed: {
    precioTotal() {
      return this.cantidad * parseFloat(this.precio);
    },
  },
};
</script>

<style>
</style>
