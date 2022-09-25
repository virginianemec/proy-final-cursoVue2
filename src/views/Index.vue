<template>
  <article>
    <PageUserComponent
      @carritoUpdate='carritoUpdate($event)'
      @reset='reset()'
      :user='user'
    ></PageUserComponent>
  </article>
</template>

<script>
import PageUserComponent from '@/components/PageUserComponent.vue';

export default {
  components: {
    PageUserComponent,
  },
  data() {
    return {
      user: this.$route.query.user,
    };
  },
};
</script>

<style>
</style>
