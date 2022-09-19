<template>
  <div>
    <div class='tabla--titulo'>{{ name }} - {{ category }}</div>
    <div class='tabla--datos'>Productos del negocio</div>
    <ListadoProductosComponent
    :products='this.products' @carritoUpdate='carritoUpdate($event)' />
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
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: 'Sin nombre',
    },
    category: {
      type: String,
      default: 'Sin categoria',
    },
    carrito: [],
    products: [],
    ofertas: [],
    orders: [],
  },
  methods: {
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
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
