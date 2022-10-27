<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div>
    <!--<h3 class="title">Bienvenido - Iniciar Sesión</h3> -->
    <div class="encabezado">Bienvenido - Iniciar Sesión</div>

    <div class="form-caja">
        <vue-form :state="formState" @submit.prevent="onSubmit()">
          <p>
            <validate class="fc my-3" tag="label">
              <input v-model="data.email" required name="email" type="email" placeholder="Email*" />
              <field-messages name="email">
                <div>Ok.</div>
                <div slot="required">Indique el email por favor.</div>
                <div slot="email">Parece que no es un email válido!</div>
              </field-messages>
            </validate>
          </p>
          <p>
            <validate class="fc my-3" tag="label">
              <input
                v-model="data.password"
                required
                name="password"
                type="password"
                placeholder="Password*"
              />
              <field-messages name="password">
                <div>Ok.</div>
                <div slot="required">Indique password por favor.</div>
              </field-messages>
            </validate>
          </p>
          <div>
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </vue-form>
      </div>
          <div v-if="loading">
            <div class="loader"></div>
          </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LoginComponent',
  data() {
    return {
      formState: {},
      data: {
        name: '',
        email: '',
        password: '',
        rol: '',
      },
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      // valida el form
      if (this.formState.$invalid) {
        this.$alert('Los datos no son correctos. Verifiquelos por favor.', 'Atención', 'error');
        return;
      }
      this.loading = true,
      // si el form es correcto sigue con la autenticacion.
      // este metodo espera que el store recupere y guarde un usuario.
      await this.$store.dispatch('getUsersFromApi', this.data);

      if (this.user) {
        // llama a la vista para que se mueva.
        await this.$store.dispatch('getNegociosFromApi');
        await this.$store.dispatch('productsFromApi');
        await this.$store.dispatch('carritoUserFromApi', this.userId);
        this.loading = false;
        this.$router.push({ name: 'Index' });
      } else {
        this.loading = false;
        this.$alert('Los datos ingresados no corresponden a un usuario.', 'Atención', 'error');
      }
    },
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
