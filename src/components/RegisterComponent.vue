<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class='login'>
    <h1 class='title'>Register</h1>
    <div class='form'>
        <label class='class-label' for='mail'>Mail</label>
        <input type='text' id='mail' v-model='email'  hint='Ingrese correo electrónico'/>
        <label class='class-label' for='pass'>Password</label>
        <input type='password' id='pass' v-bind='password' hint='Ingrese Password'/>
        <label class='class-label' for='pass-repeat'>Repita su Password</label>
        <input type='password' id='pass-repeat' v-bind='passwordRepeat' hint='Repita su Password'/>
        <p v-if='registerError' class='error'>Las contraseñas no coinciden.</p>
        <br />
        <button type='button' class='btn btn-primary' @click='registerUser()'>Registrarme</button>
    </div>
    <div >
      <button type='button' class='btn btn-primary' @click='atras()'>Volver</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      registerError: false,
    };
  },
  props: {
    registerCorrecto: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    registerUser() {
      // eslint-disable-next-line no-unused-expressions
      if (this.registerCorrecto) {
        // this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
        this.$emit('registerSuccess');
      } else {
        this.registerError = true;
        this.$alert('Los datos ingresados no son correctos.', 'Atención', 'error');
      }
      /*
        this.loginCorrecto
        ? this.$alert('Bienvenido', 'Atención', 'success')
        : this.$alert('Los datos ingresados no son correctos.', 'Atención', 'error');
        */
    },
    atras() {
      this.$emit('volver');
    },
  },
};
</script>

<style>

</style>
