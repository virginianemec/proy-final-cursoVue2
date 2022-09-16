<template>
  <div>
    <!--
    <table class='table border-primary'>
      <tbody>
        <tr v-for='producto in productos' :key='producto.id'>
          <CardProducto
            :nombre='producto.nombre'
            :precio='producto.precio'
            :imagen='producto.imagen'
            :cantidad='producto.cantidad'
          ></CardProducto>
        </tr>
      </tbody>
    </table>
  -->

    <div v-for="producto in productos" :key="producto.id">
      <CardProducto
        :id="producto.id"
        :nombre="producto.nombre"
        :precio="producto.precio"
        :imagen="producto.imagen"
        :cantidad="producto.cantidad"
      ></CardProducto>
    </div>
  </div>
</template>

<script>
import CardProducto from '@/components/CardProducto.vue';

export default {
  name: 'ListadoProductosComponent',
  components: {
    CardProducto,
  },
  data() {
    return {
      productos: [
        {
          id: 1,
          nombre: 'Sand. Vegano',
          imagen: 'logo.png',
          precio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 2,
          nombre: 'Ensalada',
          imagen: 'logo.png',
          precio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
      ],
    };
  },
  methods: {
    atras() {
      this.$emit('volver');
    },
  },
};
</script>
<style scoped></style>
