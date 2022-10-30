<template>
  <div class="row--botones">
    <button class="coder--button" @click="decrease()">-</button>
    <p>{{ cantidad }}</p>
    <button class="coder--button" @click="increase()">+</button>
    <br />
  </div>
</template>

<script>
export default {
  name: 'CountComponent',
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'Sin nombre',
    },
    image: {
      type: String,
      default: '../assets/No-image-available.png',
    },
    negocio: {
      type: Number,
      default: 1,
    },
    cantInicial: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      total: 0,
      cant: 0,
    };
  },
  created() {
    this.cant = this.cantInicial;
  },
  methods: {
    increase() {
      this.cant += 1;
      const objectdata = {
        productId: this.id,
        productPrice: this.price,
        productName: this.name,
        updateFuntion: '+',
        negocio: this.negocio,
        total: this.totalPrice,
      };
      this.$emit('carritoUpdate', objectdata);
    },
    decrease() {
      if (this.cant > 0) {
        this.cant -= 1;

        const objectdata = {
          productId: this.id,
          productPrice: this.price,
          productName: this.name,
          updateFuntion: '-',
          negocio: this.negocio,
          total: this.totalPrice,
        };
        this.$emit('carritoUpdate', objectdata);
      }
    },
    reset() {
      this.cant = 0;
    },
  },
  computed: {
    totalPrice() {
      return this.cant > 0 ? this.cant * parseFloat(this.price) : 0;
    },
    cantidad() {
      return this.cant >= 0 ? this.cant : 0;
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
  font-size: 12px;
}
.row--botones {
  display: flex;
  text-align: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
</style>
