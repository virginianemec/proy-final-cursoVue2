import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Index from '../views/Index.vue';
import Productos from '../views/Productos.vue';
import Pedidos from '../views/Pedidos.vue';
import Carrito from '../views/Carrito.vue';

Vue.use(VueRouter);

// const router = new VueRouter({routes, mode: 'history'});
export default new VueRouter({
  // generar historial de navegación
  mode: "history",
  // Ruta gral del endpoint
  base: process.env.BASE_URL,
  // array que contendrá las vistas de ruteo
  routes: [
    {
      // la ruta base,
      path: "/",
      // el nombre de dicha ruta
      name: "Login",
      // y el componente asociado a la misma, el cual proviene de la vista relacionada
      // importados arriba.
      component: Login, // () => import('../views/Login.vue'),
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/productos",
      name: "Productos",
      component: Productos,
    },
    {
      path: "/pedidos",
      name: "Pedidos",
      component: Pedidos,
    },
    {
      path: "/pedidos/:idNegocio",
      name: "PedidosDelNegocio",
      component: Pedidos,
      props: true,
    },
    {
      path: "/carrito",
      name: "Carrito",
      component: Carrito,
    },
  ],
});
