<template>
  <div class='div--container'>
    <table class='table'>
      <thead>
        <tr>
          <th colspan='2'>{{ nombre }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan='2'>
            <img :src='getImagenSrc' alt='article image' />
          </td>
        </tr>

        <tr>
          <th>Código</th>
          <td>: {{ id }}</td>
        </tr>
        <tr>
          <th>Precio</th>
          <td>: ${{ precio }}</td>
        </tr>
        <tr>
          <td colspan='2'>
            <CountComponent
              :cantidad='cantidad'
              :precio='precio'
              @modificarCarrito='modificarCarrito($event)'
            >
            </CountComponent>
          </td>
        </tr>

        <tr>
          <td>{{ total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<!--
    <table>
      <tr>
        <th colspan='2'>{{ nombre }}</th>
      </tr>
      <tr>
        <td colspan='2'>
          <img :src='getImagenSrc' alt='article image' />
        </td>
      </tr>
      <tr>
        <th>Código</th>
        <td>: {{ id }}</td>
      </tr>
      <tr>
        <th>Precio</th>
        <td>: ${{ precio }}</td>
      </tr>
      <tr>
        <td colspan='2'>
          <CountComponent
            :cantidad='cantidad'
            :precio='precio'
            @modificarCarrito='modificarCarrito($event)'
          >
          </CountComponent>
        </td>
      </tr>
    </table>
    -->

<!--

  <div class='margin border'>
    <h3>{{ nombre }}</h3>
    no <img alt='Mi app de Comidas!' src='getImagenSrc()' />
    <div class='d-flex justify-content-between'>
      <span>#{{ precio }}</span>
      no <span>{{cantidad}}</span>
      <CountComponent :cantidad='cantidad' :precio='precio'> </CountComponent>
    </div>
  </div>
</template>
-->

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
    nombre: {
      type: String,
      default: 'Sin nombre',
    },
    precio: {
      type: Number,
      default: 0,
    },
    imagen: {
      stype: String,
      default: '../assets/No-image-available.png',
    },
  },
  components: {
    CountComponent,
  },
  data() {
    return {
      // creo  que necesitare inicializar la cantidad en caso de edit.
      cantidad: 0,
      total: 0,
    };
  },
  computed: {
    getImagenSrc() {
      return `./assets/${this.imagen}.png`;
    },
  },
  methods: {
    modificarCarrito(objEvent) {
      this.total = objEvent.total;
      this.$emit('modificarCarrito', {
        id: this.id,
        precio: this.precio,
        nombre: this.nombre,
        modif: objEvent.funcion,
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
</style>
