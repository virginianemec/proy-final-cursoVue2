<template>
  <div class="contenedor">
    <div v-for="product in products" :key="product.id">
      <CardProducto
        :producto="product"
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        :cant="product.cant"
        :negocio="product.negocio"
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
    negocioId: String,
    products: [],
  },
};
</script>
<style scoped>
.contenedor {
  /*display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding-top: 20px;*/
  display: flex;
  gap: 10px;
}
</style>
