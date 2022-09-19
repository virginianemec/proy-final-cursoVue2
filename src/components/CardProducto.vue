<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div class='div--container'>
    <table class='table'>
      <thead>
        <tr>
          <th colspan='2'>{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan='2'>
            <img :src='require(`@/assets/images/${image}.png`)' />
            <!--<img :src='getImagenSrc' alt='article image' /> -->
          </td>
        </tr>

        <tr>
          <th>Código</th>
          <td>: {{ id }}</td>
        </tr>
        <tr>
          <th>Precio</th>
          <td>: ${{ price }}</td>
        </tr>
        <tr>
          <td colspan='2'>
            <CountComponent
              :cant='cant'
              :price='price'
              @carritoUpdate='carritoUpdate($event)'
            ></CountComponent>
          </td>
        </tr>

        <tr>
          <td>
            <p>{{ total }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CountComponent from '@/components/CountComponent.vue';

export default {
  name: 'CardProducto',
  // propiedades del producto:
  props: {
    id: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: 'Sin nombre',
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      stype: String,
      default: '../assets/No-image-available.png',
    },
  },
  components: {
    CountComponent,
  },
  data() {
    return {
      // creo  que necesitare inicializar la cant en caso de edit.
      cant: 0,
      total: 0,
    };
  },
  computed: {
    getImagenSrc() {
      return `./assets/${this.image}.png`;
    },
  },
  methods: {
    carritoUpdate(objEvent) {
      this.total = objEvent.total;
      this.$emit('carritoUpdate', {
        id: this.id,
        price: this.price,
        name: this.name,
        updateFuntion: objEvent.updateFuntion,
      });
    },
  },
};
</script>

<style scoped>
.div--container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
}
table {
  width: 80%;
  margin: auto;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgb(142, 142, 142);
  transition: 0.3s;
  color: #2c3e50;
  text-align: center;
}
p {
  margin: 12px 0px 0px 0px;
  color: #fd9001;
  text-align: center;
  font-size: 18px;
}
</style>
