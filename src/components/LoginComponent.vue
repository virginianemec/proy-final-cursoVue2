<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <h3 class="title">Bienvenido - Iniciar Sesión</h3>
    <div class="form">
      <vue-form :state="formState" @submit.prevent="onSubmit()">
        <validate class="fc my-3" tag="label">
          <label class="class-label" for="email">Email*</label>
          <input v-model="data.email" required name="email" type="email" />
          <field-messages name="email">
            <div>Ok.</div>
            <div class="class-label" slot="required">
              Indique el email por favor.
            </div>
            <div class="class-label" slot="email">
              Parece que no es un email válido!
            </div>
          </field-messages>
        </validate>

        <validate class="fc my-3" tag="label">
          <label class="class-label" for="password" type="password"
            >Password*</label
          >
          <input
            v-model="data.password"
            required
            name="password"
            type="password"
          />
          <field-messages name="password">
            <div>Ok.</div>
            <div class="class-label" slot="required">
              Indique password por favor.
            </div>
          </field-messages>
        </validate>

        <div class="fc my-3">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </vue-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LoginComponent',
  props: {
    // users: [],
  },
  data() {
    return {
      formState: {},
      data: {
        name: '',
        email: '',
        password: '',
        // agrego el rol del usaurio
        rol: '',
      },

      // url de mockapi de usuarios:
      // url: 'https://632ba1f21aabd8373989647d.mockapi.io/users',
      // user: null,
    };
  },
  methods: {
    async onSubmit() {
      // valida el form
      if (this.formState.$invalid) {
        this.$alert('Los datos no son correctos. Verifiquelos por favor.');
        return;
      }
      // si el form es correcto sigue con la autenticacion.
      // await this.loginUser();

      // este metodo espera que el store recupere y guarde un usuario.
      await this.$store.dispatch('getUsersFromApi', this.data);

      if (this.user) {
        // llama a la vista para que se mueva.
        // this.$emit('loginSuccess');
        await this.$store.dispatch('getNegociosFromApi');
        await this.$store.dispatch('productsFromApi');
        await this.$store.dispatch('carritoUserFromApi', this.userId);
        this.$router.push({ name: 'Index' });
      } else {
        this.$alert(
          'Los datos ingresados no corresponden a un usuario.',
          'Atención',
          'error',
        );
      }
    },
    /*
    async loginUser() {
      this.existsUsuario()
        .then((respLogin) => {
          if (respLogin) {
            // la vista llama al arouter.
            this.$emit('loginSuccess', this.user);
          } else {
            this.$alert('Los datos ingresados no corresponden a un usuario.', 'Atención', 'error');
          }
        })
        .catch(() => {
          this.$alert(
            'Los datos no son correctos o hubo algun probema contra el servidor.',
            'Atención',
            'error',
          );
        });
    },
    async existsUsuario() {
      const dataToGet = {
        email: this.data.email,
        // password: this.data.password,
      };
      let usersFromApi = [];
      this.user = null;
      await this.axios
        .get(this.url, dataToGet)
        .then((response) => {
          console.table(response.data);
          usersFromApi = response.data;
          const obj = usersFromApi.find((val) => val.email === this.data.email);
          if (obj) this.user = obj;
        })
        .catch((err) => {
          console.error(err);
        });
      return this.user;
    }, */
  },
  computed: {
    ...mapGetters(['getUserLogged', 'getUserLoggedId']),
    user() {
      return this.$store.getters.getUserLogged;
    },
    userId() {
      return this.$store.getters.getUserLoggedId;
    },
  },
};
</script>
<style scoped>
.form {
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
