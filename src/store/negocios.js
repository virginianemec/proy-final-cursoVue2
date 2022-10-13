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
      // return state.negocios[objData.index].orders;
      const negocio = state.negocios.find((item) => item.id === objData.id);
      return negocio.orders;
    },
  },
  mutations: {
    setNegocios(state, payload) {
      state.negocios = payload;
    },
    setNegocioOrders(state, objData) {
      // state.negocios[objData.index].orders = objData.orders;
      const negocio = state.negocios.find((item) => item.id === objData.id);
      negocio.orders = objData.orders;
    },
    /*
    reset(state, rootState) {
        state.negocio = [];
    },
    */
  },
  actions: {

    async getNegociosFromApi({ commit, state, dispatch }) {
      // primero trae los negocios
      await axios
        .get(URL)
        .then(async (response) => {
          console.table(response.data);
          const negociosFromApi = response.data;
          if (negociosFromApi) await commit('setNegocios', negociosFromApi);
          // por cada negocio, busca los carritos cuyo negocio = negocio.id
          state.negocios.forEach(async (negocio, index) => {
            // dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
           // let orders = [];
           // orders = await dispatch('getNegocioOrdersFromApi', negocio.id, { root: true });
          //  if (orders) await commit('setNegocioOrders', { index, orders });

          await dispatch('getOrdersFromApi', negocio.id, { root: true });
          });
        })
        .catch((err) => {
          console.error('error', err);
        })
        .finally(() => console.log('Peticion terminada - action getNegociosFromApi.'));
    },
    async updateNegocios({ state }) {
      state.negocios.forEach(async (negocio) => {
        await axios
          .put(`${URL}/${parseInt(negocio.id, 10)}`, negocio)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
