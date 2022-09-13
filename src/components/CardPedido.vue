<template>
<div>
    <p>{{nombre}}</p>
    <p>{{precio}}</p>
  </div>
</template>

<script>
export default {
  name: 'CardPedido',
  props: {
    nombre: {
      type: String,
    },
    precio: {
      type: Number,
    },
  },
};
</script>

<style>

</style>
