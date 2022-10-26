<template>
  <div>
    <ProductFormComponent ></ProductFormComponent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductFormComponent from '@/components/ProductFormComponent.vue';

export default {
  components: {
    ProductFormComponent,
  },
  mounted() {
    this.getProductos();
  },
  computed: {
    ...mapGetters(['getWorkDescription']),
    description() {
      return this.$store.getters.getWorkDescription;
    },
  },
  methods: {
    // obtener los productos from api, desde el store.
    // cuando inicio la app.
    async getProductos() {
      await this.$store.dispatch('productsFromApi');
    },
  },
};
</script>
