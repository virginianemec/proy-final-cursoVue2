<template>
  <div>
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
          imagen: './assets/logo1.png',
          presio: 150,
          // no se si necesito cantidad.
          cantidad: 0,
        },
        {
          id: 2,
          nombre: 'Ensalada',
          imagen: './assets/logo1.png',
          presio: 150,
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

<style>
</style>
