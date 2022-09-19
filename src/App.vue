<template>
  <div id='app'>
    <HeaderComponent
      :mostrarVolverEnNavBar='!mostrarVolverEnNavBar'
      @volver='volverALogin()'
    ></HeaderComponent>
    <article>
      <div v-if='loginFunction'>
        <LoginComponent
          :login-correcto='true'
          :usuarios='usuarios'
          @loginSuccess='loginSuccess(event)'
        />
        <div class='text-center'>
          <h1>No tengo cuenta</h1>

          <button type='button' class='btn btn-primary' @click='registrame()'>
            Registrarme
          </button>
        </div>
      </div>

      <div v-if='registerFunction'>
        <RegisterComponent
          :register-correcto='true'
          :usuarios='usuarios'
          @registerSuccess='registerSuccess($event)'
          @volver='volverALogin()'
        />
      </div>

      <div v-if='indexFunction'>
        <ListadoNegociosComponent
          :carrito='carrito'
          :negocios='negocios'
          @modificarCarrito='modificarCarrito($event)'
        />
      </div>

      <div v-if='indexFunction'>
        <aside>
          <CarritoComponent :carrito='carrito' />
        </aside>
      </div>
    </article>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import ListadoNegociosComponent from '@/components/ListadoNegociosComponent.vue';
import CarritoComponent from '@/components/CarritoComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import DatosBD from './datosBD';

export default {
  name: 'App',
  components: {
    LoginComponent,
    RegisterComponent,
    ListadoNegociosComponent,
    CarritoComponent,
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      // Data que se usa solo a fines practicos, calculo que luego no se usaran
      // para mostrar solo la primer pantalla login.
      loginFunction: true,
      indexFunction: false,
      registerFunction: false,

      carrito: [],
      negocios: DatosBD.negocios,
      usuarios: [{ email: 'virginia@ta.com', password: '123' }],
    };
  },
  computed: {
    mostrarVolverEnNavBar() {
      return this.loginFunction || this.registerFunction;
    },
  },
  methods: {
    loginSuccess() {
      // Enviar al index
      console.log('hola!! bienvenido al index.');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
      // this.$alert('Bienvenido', 'Atención', 'success');
    },
    registrame() {
      this.loginFunction = false;
      this.registerFunction = true;
      this.indexFunction = false;
    },
    registerSuccess(usuario) {
      this.usuarios.push(usuario);
      // Enviar al index
      console.log('hola!! register');
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;

      // this.$alert('Su usuario se ha creado correctamente. Bienvenido', 'Atención', 'success');
    },
    volverALogin() {
      this.loginFunction = true;
      this.registerFunction = false;
      this.indexFunction = false;
    },
    volverARegister() {
      this.loginFunction = false;
      this.registerFunction = true;
      this.indexFunction = false;
    },
    volverAIndex() {
      this.loginFunction = false;
      this.registerFunction = false;
      this.indexFunction = true;
    },
    modificarCarrito(objProdCant) {
      if (objProdCant.modif === '+') {
        this.aumentar(objProdCant);
      } else {
        this.decrementar(objProdCant);
      }
    },
    aumentar(objEvento) {
      const obj = this.carrito.find((val) => val.id === objEvento.id);
      if (obj) {
        if (obj.cantidad >= 0) {
          // this.cantidad += 1;
          // this.$emit('aumentar');
          obj.cantidad += 1;
        }
      } else {
        console.log('id - precio', objEvento.id, objEvento.precio);
        this.carrito.push({
          id: objEvento.id,
          nombre: objEvento.nombre,
          precio: objEvento.precio,
          cantidad: 1,
        });
      }
    },
    decrementar(objEvento) {
      const obj = this.carrito.find((val) => val.id === objEvento.id);
      if (obj) {
        if (obj.cantidad > 1) {
          obj.cantidad -= 1;
        } else {
          console.log('id - precio', objEvento.id, objEvento.precio);
          const indexOfObject = this.carrito.findIndex(
            (object) => object.id === objEvento.id,
          );

          this.carrito.splice(indexOfObject, 1);
        }
      }
    },
  },
};
</script>

<style>
* {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #959595;
  box-sizing: border-box;
  /*padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;*/
  /* box-sizing: border-box;*/
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
  /*margin: 1rem auto;
  display: flex;
  flex: 1;*/

  margin: 1rem auto;
  text-align: center;
}
#main > nav,
#main > aside {
  flex: 0 0 20vw;
  background: beige;
}
#main > nav {
  order: -1;
}
header,
footer {
  background: #f5a25d;
  height: 20vh;
  color: #389393;
  text-align: center;
}
header,
footer,
article,
nav,
aside {
  padding: 1em;
  text-align: center;
}
.img {
  padding: 2rem;
}
.title {
  text-align: center;
  font-weight: bold;
  font-size: calc(1.3rem + 0.6vw);
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 80%;
  /* background: rgba(19, 35, 47, 0.9);*/
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.class-label {
  color: #389393;
}
@media screen and (max-width: 575px) {
  #main {
    display: block;
  }
  .form {
    max-width: 80%;
  }
}
</style>
