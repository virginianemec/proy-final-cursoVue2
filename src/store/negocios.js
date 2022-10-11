import axios from 'axios';

const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/negocios';

export default {
  namespace: true,
  state: {
    negocios: [],
  },
  getters: {
    getNegocios(state) {
      return state.negocios;
    },
  },
  mutations: {
    setNegocios(state, payload) {
      state.negocios = payload;
    },
  },
  actions: {

    async getNegociosFromApi({ commit }) {
      await axios
        .get(URL)
        .then(async (response) => {
          console.table(response.data);
          const negociosFromApi = response.data;
          if (negociosFromApi) await commit('setNegocios', negociosFromApi);
        })
        .catch((err) => {
          console.error('error', err);
        })
        .finally(() => console.log('Peticion terminada - action getNegociosFromApi.'));
    },
    async updateNegocios({ context , state}) {
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
