<!-- eslint-disable comma-dangle -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
   <div class="encabezado">Registrarme</div>
      <div class="form-caja">
      <vue-form
        :state="formStateReg"
        @submit.prevent="onRegister()"
        name="registry"
      >
       <p>
        <validate
          class="fc"
          tag="label"
          :custom="{ customValidator: customValidator }"
        >
          <input v-model="data.name" type="text" required name="name" placeholder="Nombre*" />
          <field-messages name="name">
            <div class="class-label">Ok.</div>
            <div class="class-label" slot="required">
              Ingrese un nombre por favor.
            </div>
            <div class="class-label" slot="customValidator">
              El nombre debe ser unico. Intente otro.
            </div>
          </field-messages>
        </validate>
</p><p>
        <validate class="fc my-3" tag="label">
          <input v-model="data.email" required name="email" type="email" placeholder="Mail*"/>
          <field-messages name="email">
            <div class="class-label">Ok.</div>
            <div class="class-label" slot="required">
              Indique el email por favor.
            </div>
            <div class="class-label" slot="email">
              Parece que no es un email válido!
            </div>
          </field-messages>
        </validate>
</p><p>
        <validate class="fc my-3" tag="label">
          <input
            v-model="data.password"
            required
            name="password"
            type="password"
            placeholder="Password*"
          />
          <field-messages name="password">
            <div class="class-label">Ok.</div>
            <div class="class-label" slot="required">
              Indique password por favor.
            </div>
          </field-messages>
        </validate>
        </p><p>
        <validate
          class="fc my-3"
          tag="label"
          :custom="{ customValidatorPassword: customValidatorPassword }"
        >
          <input
            v-model="data.passwordRepeat"
            required
            name="passwordRepeat"
            type="password"
            placeholder="Repita la password*"
          />
          <field-messages name="passwordRepeat">
            <div class="class-label">Ok.</div>
            <div class="class-label" slot="required">
              Indique password por favor.
            </div>
            <div class="class-label" slot="customValidatorPassword">
              Las contraseñas ingresadas no coinciden.
            </div>
          </field-messages>
        </validate>
</p><p>
        <validate
          class="fc my-3"
          tag="label"
          :custom="{ ageValidator: ageValidator }"
        >
          <input v-model="data.age" required name="age" type="number" placeholder="Edad*"/>
          <field-messages name="age">
            <div class="class-label">Ok.</div>
            <div class="class-label" slot="required">
              Indique su edad por favor.
            </div>
            <!-- <div slot='number'>Parece que no es una edad válida!</div> -->
            <div class="class-label" slot="ageValidator">
              Debe ser mayor de edad (Mas de 18 años).
            </div>
          </field-messages>
        </validate>
        </p>
        <div>
          <button type="submit" class="btn btn btn-primary">Registrarme</button>
        </div>
      </vue-form>
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
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        rol: 'user',
        age: '',
        favouriteColor: '',
      },
    };
  },
  methods: {
    onRegister() {
      // valida los datos ingresados al form.
      if (this.formStateReg.$invalid) {
        this.$alert(
          'Los datos no son correctos. Verifiquelos por favor.',
          'Atención',
          'error',
        );
      } else {
        // si son correctos continua.
        this.userRegister();
      }
    },

    async userRegister() {
      if (await this.exsistUser()) {
        this.$alert(
          'Ya existe un usuario con mismos datos. Intente nuevamente.',
          'Atención',
          'error',
        );
      } else {
        const userToPost = {
          email: this.data.email,
          password: this.data.password,
          name: this.data.name,
          age: this.data.age,
          createdAt: new Date(),
          birthday: new Date(),
          rol: 'usuario',
          fovourite_color: 'green',
        };

        // llama al store para guardar el usuario nuevo.
        await this.$store.dispatch('registerUserOnApi', userToPost);

        if (this.user) {
        // llama a la vista para que se mueva.
          this.$alert(
            'Su usuario se ha creado correctamente. Bienvenido',
            'Atención',
            'success',
          );
          this.$router.push({ name: 'Index' });
        } else {
          this.$alert('No pudo crearse el usuairo. Intente de nuevo.', 'Atención', 'error');
        }
      }
    },
    async exsistUser() {
      const dataToGet = {
        email: this.data.email,
        // password: this.data.password,
      };
      const existUserRegister = await this.$store.dispatch('getUserRegisterFromApi', dataToGet);
      return existUserRegister;
    },

    async register() {
      const userToPost = {
        email: this.data.email,
        password: this.data.password,
        name: this.data.name,
        age: this.data.age,
        createdAt: new Date(),
        birthday: new Date(),
        rol: 'user',
        fovourite_color: 'green',
      };
      // llama al store para guardar el usuario nuevo.
      await this.$store.dispatch('registerUserOnApi', userToPost);
    },

    ageValidator() {
      let respuesta = false;

      if (this.data.age >= 18) {
        respuesta = true;
      }
      return respuesta;
    },
    customValidator() {
      let respuesta = false;

      if (!this.userNameExists()) {
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
    userNameExists() {
      // TODO: verificar contra mas datos
      // no puedo esto por que no tenog los usuarios aun....
      /*
      const obj = this.users.find((val) => val.name === this.data.name);
      return !!obj;
      */
      return false;
    },
  },
};
</script>

<style scoped>

</style>
