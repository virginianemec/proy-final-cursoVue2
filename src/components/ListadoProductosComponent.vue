<template>
  <div class="contenedor">
    <div v-for="(product, index) in products" :key="index">
      <div v-if="product.activo == 1">
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
}
</style>
