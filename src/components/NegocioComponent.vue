<template>
  <div>
    <div class='tabla--titulo'>{{ name }} - {{ category }}</div>
    <div class='tabla--datos'>Productos del negocio</div>
    <ListadoProductosComponent
      :products='this.productosFromApi'
      @carritoUpdate='carritoUpdate($event)'
    />
    <br />
    <!--
    <div class='tabla--datos'> Pedidos del negocio</div>
    <ListadoPedidosComponent :pedidos='pedidos' />
    <br />
    <br />
    <div class='tabla--datos'> Ofertas</div>
    <ListadoOfertasComponent :ofertas='ofertas' />
    <br />-->
  </div>
</template>

<script>
/*
import ListadoPedidosComponent from './ListadoPedidosComponent.vue';
import ListadoOfertasComponent from './ListadoOfertasComponent.vue';
*/
import ListadoProductosComponent from './ListadoProductosComponent.vue';

export default {
  name: 'NegocioComponent',
  props: {
    name: {
      type: String,
      default: 'Sin nombre',
    },
    category: {
      type: String,
      default: 'Sin categoria',
    },
    id: {
      type: String,
      default: '',
    },
    carrito: [],
    /* Products ya no es una props,
    // lo busco desde el api para el id de este negocio.
    products: [],
    */
    ofertas: [],
    orders: [],
  },
  data() {
    return {
      productosFromApi: [],
      url: 'https://632ba1f21aabd8373989647d.mockapi.io/productos/',
    };
  },
  created() {
    this.getProductos();
  },
  methods: {
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
    async getProductos() {
      /*
      const dataToGet = {
        negocio: this.id,
      };
      */
      await this.axios
        .get(`${this.url}?negocio=${this.id}`)
        .then((response) => {
          console.table(response.data);
          // const respArray = response.data;
          // this.productosFromApi.push(respArray.forEach((val) =>
          // { val.negocio === parseInt(this.id); }));
          this.productosFromApi = response.data;
        })
        .catch((err) => {
          console.error(`${err}`);
        });
    },
  },
  components: {
    // ListadoPedidosComponent,
    ListadoProductosComponent,
    // ListadoOfertasComponent,
  },
};
</script>

<style scoped>
* {
}
.tabla--titulo {
  background: yellowgreen;
  height: 25px;
  color: black;
  text-align: center;
  padding: 20px;
}
.tabla--datos {
  background: yellowgreen;
  height: 25px;
  color: black;
  font: bold;
}
</style>
