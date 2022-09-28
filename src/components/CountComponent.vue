<template>
  <div class="row--botones">
    <button class="coder--button" @click="decrease()">-</button>
    <p>{{ cant }}</p>
    <button class="coder--button" @click="increase()">+</button>
    <br />
    <!--<p>{{ precioTotal }}</p> -->
  </div>
</template>

<script>
export default {
  name: 'CountComponent',
  props: {
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
      if (this.cant >= 0) {
        this.cant += 1;
        this.$emit('carritoUpdate', {
          updateFuntion: '+',
          total: this.totalPrice,
        });
      }
    },
    decrease() {
      if (this.cant > 0) {
        this.cant -= 1;
        this.$emit('carritoUpdate', {
          updateFuntion: '-',
          total: this.totalPrice,
        });
      }
    },
    reset() {
      this.cant = 0;
    },
  },
  computed: {
    totalPrice() {
      return this.cant * parseFloat(this.price);
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
.row--botones {
  display: flex;
  text-align: center;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
</style>
