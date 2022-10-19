<template>
    <ListadoNegociosComponent   />
</template>

<script>
import ListadoNegociosComponent from '@/components/ListadoNegociosComponent.vue';

export default {
  components: {
    ListadoNegociosComponent,
  },
};
</script>

<style scoped>
.div--container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-top: 20px;
}
</style>
