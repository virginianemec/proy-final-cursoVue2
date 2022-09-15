<template>
  <div>
    <p>{{ id }}</p>
    <p>{{ nombre }}</p>
    <p>{{ categoria }}</p>
    <br />
    <ListadoProductosComponent />
    <br />
    <ListadoPedidosComponent />
    <br />
  </div>
</template>

<script>
import ListadoPedidosComponent from './ListadoPedidosComponent.vue';
import ListadoProductosComponent from './ListadoProductosComponent.vue';

export default {
  name: 'NegocioComponent',
  data() {
    return {
    /*
      pedidos: [
        {
          id: 1,
          obs: '',
          detalle: [
            {
              prodId: 1,
              prodName: 'Tostada',
              prodPrecio: 270,
            },
          ],
        },
        {
          id: 2,
          obs: '',
          detalle: [
            {
              prodId: 1,
              prodName: 'Gaseosa',
              prodPrecio: 180,
            },
          ],
        },
      ],
      productos: [
        {
          id: 1,
          nombre: 'Sand. Vegano',
          imagen: './assets/imagen1.png',
          // no se si necesito cantidad.
          cantidad: 0,
        },
      ],
      */
      ofertas: [],
    };
  },
  props: {
    nombre: {
      type: String,
      default: 'Sin nombre',
    },
    categoria: {
      type: String,
      default: 'Sin categoria',
    },
  },
  components: { ListadoPedidosComponent, ListadoProductosComponent },
};
</script>

<style>
</style>
