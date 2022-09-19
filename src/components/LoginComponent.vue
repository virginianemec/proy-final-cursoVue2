<!-- eslint-disable no-unused-expressions -->type='button'Success
<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class='login'>
    <h3 class='title'>Bienvenido - Iniciar Sesión</h3>
    <div class='form'>
      <vue-form :state='formState' @submit.prevent='onSubmit()'>
        <validate class='fc my-3' tag='label'>
          <label class='class-label' for='email'>Email*</label>
          <input v-model='data.email' required name='email' type='email' />
          <field-messages name='email'>
            <div>Ok.</div>
            <div class='class-label' slot='required'>Indique el email por favor.</div>
            <div class='class-label' slot='email'>Parece que no es un email válido!</div>
          </field-messages>
        </validate>

        <validate class='fc my-3' tag='label'>
          <label class='class-label' for='password' type="password">Password*</label>
          <input
            v-model='data.password'
            required
            name='password'
            type='password'
          />
          <field-messages name='password'>
            <div>Ok.</div>
            <div class='class-label' slot='required'>Indique password por favor.</div>
          </field-messages>
        </validate>

        <div class='fc my-3'>
          <button type='submit' class='btn btn-info'>Login</button>
        </div>
      </vue-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    usuarios: [],
    loginCorrecto: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formState: {},
      data: {
        nombre: '',
        email: '',
        password: '',
      },
      // No se usa aun.
      checked: [],

      /*
      data: {
        email: '',
        password: '',
      },
      */
      // Esta variable es para ver la logica. seguramente luego no la use.
      // errorLogin: false,
    };
  },
  methods: {
  /*
   onSubmit() {
      this.loginUser();
    },
    */
    loginUser() {
      // eslint-disable-next-line no-unused-expressions
      if (this.existeUsuario()) {
        // this.errorLogin = false;
        this.$emit('loginSuccess');
      } else {
        // this.errorLogin = true;
        this.$alert(
          'Los datos ingresados no corresponden a un usuario.',
          'Atención',
          'error',
        );
      }
    },
    existeUsuario() {
      // TODO: verificar contra mas datos
      const obj = this.usuarios.find((val) => val.email === this.data.email);
      return !!obj;
    },
    onSubmit() {
      // valida el form
      if (this.formState.$invalid) {
        this.$alert('Los datos no son correctos. Verifiquelos por favor.');
        return;
      }
      // si el form e socrrecto sigue con la autenticacion.
      this.loginUser();
    },
  },
};
// quiakits
</script>
<style >
</style>
