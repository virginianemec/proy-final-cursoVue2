<template>
  <div id="app">
    <HeaderComponent :buttonReturnShowInHeader="!buttonReturnShowInHeader"
     @back="returnToLogin()"></HeaderComponent>
    <article>
      <div v-if="loginFunction">
        <LoginComponent :users="users" @loginSuccess="loginSuccess($event)" />
        <!-- <div class='text-center'>-->
        <div class="title">No tengo cuenta</div>

        <button type="submit" class="btn btn-primary" @click="registrame()">Registrarme</button>
        <!--</div>-->
      </div>

      <div v-if="registerFunction">
        <RegisterComponent
          :register-correcto="true"
          :users="users"
          @registerSuccess="registerSuccess($event)"
          @back="returnToLogin()"
        />
      </div>
      <div v-if="indexFunction">
        <PageUserComponent
          :carrito="carrito"
          :negocios="negocios"
          @carritoUpdate="carritoUpdate($event)"
          @reset="reset()"
          :user="user"
        ></PageUserComponent>
      </div>
      <!--
      <div v-if='indexFunction'>
        <ListadoNegociosComponent
          :carrito='carrito'
          :negocios='negocios'
          @carritoUpdate='carritoUpdate($event)'
        />
      </div>

      <div v-if='indexFunction'>
        <aside>
          <CarritoComponent :carrito='carrito' />
        </aside>
        <button type='button' class='btn btn-primary' @click='reset()'>
          Vaciar carrito
        </button>
      </div>
      -->
    </article>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
/* import ListadoNegociosComponent from '@/components/ListadoNegociosComponent.vue';
import CarritoComponent from '@/components/CarritoComponent.vue'; */
import PageUserComponent from './components/PageUserComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import DatosBD from './datosBD';

export default {
  name: 'App',
  components: {
    LoginComponent,
    RegisterComponent,
    // ListadoNegociosComponent,
    // CarritoComponent,
    PageUserComponent,
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      // Data que se usa solo a fines practicos, calculo que luego no se usaran
      // para mostrar solo la primer pantalla login.
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      loginFunction: true,
      indexFunction: false,
      registerFunction: false,

      carrito: [],
      negocios: DatosBD.negocios,
      users: [{ email: 'virginia@ta.com', password: '123' }],
      user: {},
    };
  },
  computed: {
    buttonReturnShowInHeader() {
      return this.loginFunction || this.registerFunction;
    },
  },
  methods: {
    loginSuccess(user) {
      // Enviar al index
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      // console.log('hola!! bienvenido al index.');
      this.user = user;
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
      // this.$alert('Bienvenido', 'Atención', 'success');
    },
    registrame() {
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      this.loginFunction = false;
      this.registerFunction = true;
      this.indexFunction = false;
    },
    registerSuccess(user) {
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      this.users.push(user);
      // Enviar al index
      // console.log('hola!! register');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;

      // this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
    },
    returnToLogin() {
      // esto se manejara preguntando si el
      // usuairo exuste en el array de users del componenet
      this.loginFunction = true;
      this.registerFunction = false;
      this.indexFunction = false;
    },
    carritoUpdate(objProdCant) {
      if (objProdCant.updateFuntion === '+') {
        this.increase(objProdCant);
      } else {
        this.decrease(objProdCant);
      }
    },
    increase(objEvento) {
      const obj = this.carrito.find((val) => val.id === objEvento.id);
      if (obj) {
        if (obj.cant >= 0) {
          obj.cant += 1;
        }
      } else {
        console.log('id - price', objEvento.id, objEvento.price);
        this.carrito.push({
          id: objEvento.id,
          name: objEvento.name,
          price: objEvento.price,
          cant: 1,
        });
      }
    },
    decrease(objEvento) {
      const obj = this.carrito.find((val) => val.id === objEvento.id);
      if (obj) {
        if (obj.cant > 1) {
          obj.cant -= 1;
        } else {
          console.log('id - price', objEvento.id, objEvento.price);
          const indexOfObject = this.carrito.findIndex((object) => object.id === objEvento.id);

          this.carrito.splice(indexOfObject, 1);
        }
      }
    },
    reset() {
      // no funciona bien pues en pantalla no reinicia los countComponents
      this.carrito = [];
    },
  },
};
</script>

<style>
* {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.42857143;
  color: #959595;
  box-sizing: border-box;
}
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin: 0;
}
#main {
  display: flex;
  flex: 1;
}
#main > article {
  margin: 1rem auto;
  display: flex;
  flex: 1;
  /* este etsa*/
  margin: 1rem auto;
  text-align: center;
}
#main > aside {
  flex: 0 0 20vw;
  background: beige;
}
article,
aside {
  padding: 1em;
  text-align: center;
}
.btn-primary {
  color: #fff;
  background-color: orange;
  border-color: orange;
}
.title {
  text-align: center;
  font-weight: bold;
  color: #504c4c;
  font-size: calc(1.3rem + 0.6vw);
}

@media screen and (max-width: 575px) {
  * {
    max-width: 100%;
  }
}
</style>
