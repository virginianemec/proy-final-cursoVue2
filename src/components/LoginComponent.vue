<!-- eslint-disable no-unused-expressions -->type='button'Success
<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class='login'>
    <h3 class='title'>Bienvenido - Iniciar Sesión</h3>
    <div class='form'>
        <label class='class-label' for='mail'>Mail</label>
        <input type='text' id='mail' v-model='email'  alt='Ingrese correo electrónico'/>
        <label  class='class-label' for='pass'>Password</label>
        <input type='password' id='pass' v-bind='password' hint='Ingrese Password'/>
         <p v-if='errorLogin'  class='class-label'>Has introducido mal el email o la contraseña.</p>
        <br />
        <button type='button' class='btn btn-primary'  @click='loginUser()'>Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    loginCorrecto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      // Esta variable es para ver la logica. seguramente luego no la use.
      errorLogin: false,
    };
  },
  methods: {
    loginUser() {
      // eslint-disable-next-line no-unused-expressions
      if (this.loginCorrecto) {
        this.errorLogin = false;
        this.$emit('loginSuccess');
      } else {
        this.errorLogin = true;
        this.$alert('Los datos ingresados no son correctos.', 'Atención', 'error');
      }
      /*
        this.loginCorrecto
        ? this.$alert('Bienvenido', 'Atención', 'success')
        : this.$alert('Los datos ingresados no son correctos.', 'Atención', 'error');
        */
    },
  },
};
</script>
<style >
</style>
