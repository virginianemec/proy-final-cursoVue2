<template>
  <div class="card">
    <button @click="decrementar()">-</button>
    <p>{{ cantidad }}</p>
    <button @click="aumentar()">+</button>
    <br>
    <p>{{precioTotal}}</p>
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

<style scoped>
  .card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration-color: blueviolet;
    padding-block: 10,10,10,10;
    border-block: 1,1,1,1;
  }
</style>
