<template>
  <div class='contenedor'>
    <div v-for='producto in productos' :key='producto.id'>
      <CardProducto
        :id='producto.id'
        :nombre='producto.nombre'
        :precio='producto.precio'
        :imagen='producto.imagen'
        :cantidad='producto.cantidad'
        @modificarCarrito='modificarCarrito($event)'
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
  props: {
    productos: [],
  },
  data() {
    return {};
  },
  methods: {
    atras() {
      this.$emit('volver');
    },
    modificarCarrito(obj) {
      this.$emit('modificarCarrito', obj);
    },
  },
};
</script>
<style scoped>
.contenedor {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding-top: 20px;
}
</style>
