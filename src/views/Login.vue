<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <article>
      <div>
        <LoginComponent :user='user' @loginSuccess='loginSuccess($event)' />
        <div class='title'>No tengo cuenta</div>
        <button type='submit' class='btn btn-primary' @click='registrame()'>
          Registrarme
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    loginSuccess(user) {
      // Enviar al index
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      // console.log('hola!! bienvenido al index.');
      this.user = user;
      // CONSULTAR: problema!! no puedo reiniciar el header con el usuarios!
      this.$emit('loginSuccess', this.user);
      // this.$alert('Bienvenido', 'Atención', 'success');
      this.$router.push({ name: 'Index', query: { user: this.user } });
    },
    registrame() {
      this.$router.push({ name: 'Register' });
    },
  },
  components: {
    LoginComponent,
  },
};
</script>
