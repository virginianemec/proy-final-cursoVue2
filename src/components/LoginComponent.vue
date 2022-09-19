<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <h3 class='title'>Bienvenido - Iniciar Sesión</h3>
    <div class='form'>
      <vue-form :state='formState' @submit.prevent='onSubmit()'>
        <validate class='fc my-3' tag='label'>
          <label class='class-label' for='email'>Email*</label>
          <input v-model='data.email' required name='email' type='email' />
          <field-messages name='email'>
            <div>Ok.</div>
            <div class='class-label' slot='required'>
              Indique el email por favor.
            </div>
            <div class='class-label' slot='email'>
              Parece que no es un email válido!
            </div>
          </field-messages>
        </validate>

        <validate class='fc my-3' tag='label'>
          <label class='class-label' for='password' type='password'
            >Password*</label
          >
          <input
            v-model='data.password'
            required
            name='password'
            type='password'
          />
          <field-messages name='password'>
            <div>Ok.</div>
            <div class='class-label' slot='required'>
              Indique password por favor.
            </div>
          </field-messages>
        </validate>

        <div class='fc my-3'>
          <button type='submit' class='btn btn-primary'>Login</button>
        </div>
      </vue-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    users: [],
  },
  data() {
    return {
      formState: {},
      data: {
        name: '',
        email: '',
        password: '',
      },
      // No se usa aun.
      checked: [],
    };
  },
  methods: {
    loginUser() {
      if (this.existeUsuario()) {
        this.$emit('loginSuccess');
      } else {
        this.$alert(
          'Los datos ingresados no corresponden a un usuario.',
          'Atención',
          'error',
        );
      }
    },
    existeUsuario() {
      // TODO: verificar contra mas datos
      const obj = this.users.find((val) => val.email === this.data.email);
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
</script>
<style scoped>
.form {
  /*display: flex;*/
  /*flex-direction: column;
  justify-content: center;
  width: 35%;
  min-width: 350px;
  max-width: 80%;
  /* background: rgba(19, 35, 47, 0.9);*/
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.btn-primary {
  color: #fff;
  background-color: orange;
  border-color: orange;
}
.class-label {
  color: #04000a;
}
</style>
