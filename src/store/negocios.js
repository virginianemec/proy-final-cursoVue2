import axios from 'axios';

const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/negocios';

export default {
  namespace: true,
  state: {
    negocios: [],
    negocioOrders: [],
  },
  getters: {
    getNegocios(state) {
      return state.negocios;
    },
    getNegocioOrders(state, objData) {
      const negocio = state.negocios.find((item) => item.id === objData.id);
      return negocio.orders;
    },
  },
  mutations: {
    setNegocios(state, payload) {
      state.negocios = payload;
    },
    setNegocioOrders(state, objData) {
      const negocio = state.negocios.find((item) => item.id === objData.id);
      negocio.orders = objData.orders;
    },
  },
  actions: {

    async getNegociosFromApi({ commit, state, dispatch }) {
      // primero trae los negocios
      await axios
        .get(URL)
        .then(async (response) => {
          const negociosFromApi = response.data;
          if (negociosFromApi) await commit('setNegocios', negociosFromApi);
          // por cada negocio, busca los carritos cuyo negocio = negocio.id
          await Promise.all(
            state.negocios.map(async (negocio) => {
              await dispatch('getOrdersFromApi', negocio.id, { root: true });
            }),
          );
        })
        .catch((err) => {
          console.error('error', err);
        });
    },
  },
};
