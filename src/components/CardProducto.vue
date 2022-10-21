<!-- eslint-disable vuejs-accessibility/alt-text -->
<template>
  <div> <!-- class="div--container-->
    <table class="table">
      <thead>
        <tr>
          <th colspan="2">{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">
            <img :src="require(`@/assets/images/${getImage()}.png`)" />
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
          <td colspan="2">
            <CountComponent :cant="cant" :price="price" @carritoUpdate="carritoUpdate($event)"></CountComponent>
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
import { mapGetters } from 'vuex';
import CountComponent from '@/components/CountComponent.vue';

export default {
  name: 'CardProducto',
  // propiedades del producto:
  props: {
    id: {
      type: String,
      default: '',
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
      type: String,
      default: '../assets/No-image-available.png',
    },
    negocio: {
      type: Number,
      default: 1,
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
    ...mapGetters(['getUserLoggedId']),
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
    getImagenSrc() {
      return `./assets/${this.image}.png`;
    },
  },
  methods: {
    async carritoUpdate(objEvent) {
      this.total = objEvent.total;
      const objectdata = {
        productId: this.id,
        productPrice: this.price,
        productName: this.name,
        updateFuntion: objEvent.updateFuntion,
        userId: this.userId,
        negocio: this.negocio,
      };
      if (objEvent.updateFuntion === '+') {
        await this.$store.dispatch('increase', objectdata);
      } else {
        await this.$store.dispatch('decrease', objectdata);
      }
      // await this.$store.dispatch('carritoUserFromApi', this.userId);
    },
    getImage() {
      return this.image === '' ? 'No-image-available' : this.image;
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
  width: 90%;
  margin: auto;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgb(142, 142, 142);
  transition: 0.3s;
  color: #2c3e50;
  text-align: center;
}
tr {
  width: 180px;
}
p {
  margin: 12px 0px 0px 0px;
  color: #fd9001;
  text-align: center;
  font-size: 18px;
}
img {
  width: 150px;
}
</style>
