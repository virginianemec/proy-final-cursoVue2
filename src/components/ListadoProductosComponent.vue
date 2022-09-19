<template>
  <div class='contenedor'>
    <div v-for='product in products' :key='product.id'>
      <CardProducto
        :id='product.id'
        :name='product.name'
        :price='product.price'
        :image='product.image'
        :cant='product.cant'
        @carritoUpdate='carritoUpdate($event)'
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
    products: [],
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$emit('back');
    },
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
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
