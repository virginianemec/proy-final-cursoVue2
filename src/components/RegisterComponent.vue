<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable no-unused-expressions -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class='login'>
    <h3 class='title'>Registrarme</h3>
    <div class='form'>
      <vue-form :state='formStateReg' @submit.prevent='onRegister()' name='registro'>
        <validate class='fc' tag='label' :custom='{ customValidator: customValidator }'>
          <label class='class-label' for='nombre'>Nombre*</label>
          <input v-model='data.nombre' type='text' required name='nombre' />
          <field-messages name='nombre'>
            <div class='class-label'>Ok.</div>
            <div class='class-label' slot='required'>Ingrese un nombre por favor.</div>
            <div class='class-label' slot='customValidator'>
              El nombre debe ser unico. Intente otro.
            </div>
          </field-messages>
        </validate>

        <validate class='fc my-3' tag='label'>
          <label class='class-label' for='mail'>Mail*</label>
          <input v-model='data.email' required name='email' type='email' />
          <field-messages name='email'>
            <div class='class-label'>Ok.</div>
            <div class='class-label' slot='required'>Indique el email por favor.</div>
            <div class='class-label' slot='email'>Parece que no es un email válido!</div>
          </field-messages>
        </validate>

        <validate class='fc my-3' tag='label'>
          <label class='class-label' for='password'>Password*</label>
          <input v-model='data.password' required name='password' type='password' />
          <field-messages name='password'>
            <div class='class-label'>Ok.</div>
            <div class='class-label' slot='required'>Indique password por favor.</div>
          </field-messages>
        </validate>
        <validate
          class='fc my-3'
          tag='label'
          :custom='{ customValidatorPassword: customValidatorPassword }'
        >
          <label class='class-label' for='passwordRepeat'>Repita la password*</label>
          <input v-model='data.passwordRepeat' required name='passwordRepeat' type='password' />
          <field-messages name='passwordRepeat'>
            <div class='class-label'>Ok.</div>
            <div class='class-label' slot='required'>Indique password por favor.</div>
            <div class='class-label' slot='customValidatorPassword'>
              Las contraseñas ingresadas no coinciden.
            </div>
          </field-messages>
        </validate>

        <validate class='fc my-3' tag='label' :custom='{ edadValidator: edadValidator }'>
          <label class='class-label' for='edad'>Edad*</label>
          <input v-model='data.edad' required name='edad' type='number' />
          <field-messages name='edad'>
            <div class='class-label'>Ok.</div>
            <div class='class-label' slot='required'>Indique su edad por favor.</div>
            <!-- <div slot='number'>Parece que no es una edad válida!</div> -->
            <div class='class-label' slot='edadValidator'>
              Debe ser mayor de edad (Mas de 18 años).
            </div>
          </field-messages>
        </validate>
        <div class='fc my-3'>
          <button type='submit' class='btn btn btn-primary'>Registrarme</button>
        </div>
      </vue-form>

      <!--
      <button type='button' class='btn btn-primary' @click='registerUser()'>
        Registrarme
      </button>
      -->
    </div>
    <div class='text-center'>
      <button type='button' class='btn btn-primary' @click='atras()'>Volver</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent',
  data() {
    return {
      formStateReg: {},
      data: {
        nombre: '',
        email: '',
        password: '',
        passwordRepeat: '',
        rol: '',
        edad: '',
        color_preferido: '',
      },
      // usersLogued: [],
      // checked: [],
      // login: true,

      /*
      data: {
        email: '',
        password: '',
        passwordRepeat: '',
        registerError: false,
      },
      */
    };
  },
  props: {
    usuarios: [],
  },
  methods: {
    registerUser() {
      // eslint-disable-next-line no-unused-expressions
      if (!this.existeUsuario()) {
        this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
        this.$emit('registerSuccess', this.data);
      } else {
        // this.registerError = true;
        this.$alert(
          'Ya existe un usuario con mismos datos. Intente nuevamente.',
          'Atención',
          'error',
        );
      }
    },
    onRegister() {
      // valida los datos ingresados al form.
      if (this.formStateReg.$invalid) {
        this.$alert('Los datos no son correctos. Verifiquelos por favor.', 'Atención', 'error');
        return;
      }
      // si son correctos continua.
      this.registerUser();
    },
    atras() {
      this.$emit('volver');
    },
    existeUsuario() {
      // TODO: verificar contra mas datos
      const obj = this.usuarios.find((val) => val.email === this.data.email);
      return !!obj;
    },
    edadValidator() {
      let respuesta = false;

      if (this.data.edad >= 18) {
        respuesta = true;
      }
      return respuesta;
    },
    customValidator() {
      let respuesta = false;

      if (!this.existeUsuarioNombre()) {
        respuesta = true;
      }
      return respuesta;
    },
    customValidatorPassword() {
      let respuesta = false;
      if (this.data.password !== '' && this.data.passwordRepeat !== '') {
        if (this.data.password === this.data.passwordRepeat) {
          respuesta = true;
        }
      }
      return respuesta;
    },
    existeUsuarioNombre() {
      // TODO: verificar contra mas datos
      const obj = this.usuarios.find((val) => val.nombre === this.data.nombre);
      return !!obj;
    },
  },
};
</script>

<style scoped>
.btn-primary {
  color: #fff;
  background-color: orange;
  border-color: orange;
}
</style>
