import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import products from './products';
import users from './users';
import carrito from './carrito';
import negocios from './negocios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workDescription: '',
  },

  getters: {
    getWorkDescription(state) {
      return state.workDescription;
    },
    getUserCarrito(state, getters, rootState, rootGetters) {
      const userId = rootGetters.getUserLoggedId;
      const filtrado = rootGetters.getProducts.filter(
        (item) => item.user === userId,
      );
      return filtrado;
    },
  },

  mutations: {
    setWorkDescription(state, message) {
      state.workDescription = message;
    },
    /*
    reset(rootState) {
      rootState.setNegocios([]);
    },
    */
  },

  actions: {
    cambiarWorkDescription({ commit }, message) {
      commit('setWorkDescription', message);
    },
    async carritoComprar({ getters }) {
      // comprar: toma cada producto, y actualiza las ordenes para cada negocio dueño dle producto.
      await getters.getCarrito.forEach(async (element) => {
        // carrito
        const valId = element.id;
        // const arrayProductos = getters.getProducts;
        // productos
        // const producto = arrayProductos.find((todo) => todo.id === element.id);
        // negocio
        // const negocioId = producto.negocio;
        element.estado = 'COMPRADO';
        // await commit('comprarDevolverItem', index), accion;
        await axios
          // .delete(`https://632ba1f21aabd8373989647d.mockapi.io/negocios/${element.id}`)
          .put(`${URL}/${valId}`, element)
          .then((response) => {
            console.table(response.data);
            /*
            const arrayNegocios = getters.getNegocios;
            const negocio = arrayNegocios.find(
              (item) => parseInt(item.id, 10) === parseInt(negocioId, 10),
            );
            if (negocio) negocio.orders.push(element);
            /*
            */
            // TODO: buscar los carritos y ordenes de nuevo.
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  modules: {
    products,
    users,
    carrito,
    negocios,
  },
});
