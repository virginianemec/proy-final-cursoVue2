<template>
  <div>
    <div v-if='indexFunction'>
      <ListadoNegociosComponent
        :carrito='carrito'
        :negocios='negocios'
        @carritoUpdate='carritoUpdate($event)'
      />
    </div>

    <div v-if='indexFunction'>
      <aside>
        <CarritoComponent :carrito='carrito' />
      </aside>
      <button type='button' class='btn btn-primary' @reset='reset()'>
        Vaciar carrito
      </button>
    </div>
  </div>
</template>

<script>
import ListadoNegociosComponent from '@/components/ListadoNegociosComponent.vue';
import CarritoComponent from '@/components/CarritoComponent.vue';

export default {
  name: 'PageUserComponent',
  components: {
    ListadoNegociosComponent,
    CarritoComponent,
  },
  props: {
    carrito: [],
    negocios: [],
  },
  methods: {
    carritoUpdate(obj) {
      this.$emit('carritoUpdate', obj);
    },
    reset() {
      this.$emit('reset');
    },
  },
};
</script>

<style>
</style>