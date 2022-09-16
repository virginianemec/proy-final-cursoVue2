<template>
  <div   style="display: flex; flex-direction: row;">
    <button class="coder--button" @click="decrementar()">-</button>
    <p>{{ cantidad }}</p>
    <button class="coder--button" @click="aumentar()">+</button>
    <br />
    <p>{{ precioTotal }}</p>
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
.coder--button {
  border-radius: 10px;
  border: none;
  background-color: #393b43;
  color: #e5f876;
  padding: 10px;
  width: 50px;
  cursor: pointer;
}
p {
  margin: 12px 0px 0px 0px;
  color: #fd9001;
  text-align: center;
  font-size: 18px;
}
</style>
