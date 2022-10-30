import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router/router';

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
  },

  actions: {
    cambiarWorkDescription({ commit }, message) {
      commit('setWorkDescription', message);
    },

    async logout({ commit, dispatch }) {
      await dispatch('setCarritoTemp').then(
        async () => {
          // console.log('temrino');
          commit('logoutUser');
        },
      ).finally(router.push({ name: 'Login' }));
    },
  },
  modules: {
    products,
    users,
    carrito,
    negocios,
  },
});
