<template>
  <div>
    <ProductFormComponent @itemAdd="itemAddFromForm($event)"
    :products="products"></ProductFormComponent>
    <ProductsTableComponente :products="products"></ProductsTableComponente>
  </div>
</template>

<script>
import ProductFormComponent from '@/components/ProductFormComponent.vue';
import ProductsTableComponente from '@/components/ProductsTableComponente.vue';

export default {
  components: { ProductFormComponent, ProductsTableComponente },
  data() {
    return {
      products: [],
      url: 'https://632ba1f21aabd8373989647d.mockapi.io/productos/',
    };
  },
  created() {
    this.getProductos();
  },
  methods: {
    async itemAddFromForm(objProduct) {
      const id = this.products.length + 1;
      objProduct.id = id;
      objProduct.id_producto = id;
      await this.productSave(objProduct)
        .then((resp) => {
          console.log(resp);
          this.$alert('Se ha creado el producto.', 'Atención', 'success');
          this.getProductos();
        })
        .catch((err) => {
          this.$alert(`No pudo crearse el producto. Intente de nuevo. ${err}`);
        });
      console.log('add item');
    },
    async getProductos() {
      await this.axios
        .get(this.url)
        .then((response) => {
          console.table(response.data);
          this.products = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async productSave(producto) {
      await this.axios
        .post(this.url, producto)
        .then((response) => {
          console.table(response.data);
          this.products = response.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /*
      async callAxios(str) {
      try {
        const url = "http://asd.com”;
        let response = await axios.get(url, {timeout: 10000});
        this.results = response.data;
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    */
  },
};
</script>

<style>
</style>
