import axios from 'axios';
const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/users';

export default {
  namespace: true,
  state: {
  /*  en MockApi.
"email": "virginia@ta.com",
"id": "1"
"name": "Virginia",
"password": "123",
"rol": "admin",
"age": "29",
"birthday": "2022-09-23T23:27:08.664Z",
"fovourite_color": "green",
"createdAt": "2022-09-23T23:27:08.664Z",
*/
    // usuario harcodeado.
    /* userLogged: {
      email: 'virginia@ta.com',
      name: 'Alejo',
      password: 'admin', // user
      rol: true,
      id: '1',
    }, */
    userLogged: {
      email: '',
      name: '',
      password: 'user', // user, admin
      rol: false,
      id: '',
    },
  },
  getters: {
    getUserLogged(state) {
      return state.userLogged;
    },
    getIsAdmin(state) {
      return state.userLogged.rol === 'admin';
    },
  },
  mutations: {
    setUserLogged(state, payload) {
      state.userLogged = payload;
    },
  },
  actions: {

    async getUsersFromApi({ commit }, objUserToLoging) {
      const data = {
        email: objUserToLoging.email,
      };
      let usersFromApi = [];
      //  TODO: ver que sea el usaurio con el email,
      // o bien filtrar el que tenga el email.
      await axios
        .get(URL, data)
        .then(async (response) => {
          console.table(response.data);
          usersFromApi = response.data;
          const objUser = usersFromApi.find((val) => val.email === data.email);
          if (objUser) await commit('setUserLogged', objUser);
        })
        .catch((err) => {
          console.error('error', err);
        })
        .finally(() => console.log('Peticion terminada - action getUserLogged.'));
    },

    async registerUserOnApi({ commit }, objUserToRegister) {
      await axios
        .post(URL, objUserToRegister)
        .then(async (response) => {
          console.table(response.data);
          const objUser = response.data;
          if (objUser) await commit('setUserLogged', objUser);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // return true if user is register.
    async getUserRegisterFromApi({ commit }, objUserToLoging) {
      const data = {
        email: objUserToLoging.email,
      };
      let usersFromApi = [];
      //  TODO: ver que sea el usaurio con el email,
      // o bien filtrar el que tenga el email.
      await axios
        .get(URL, data)
        .then(async (response) => {
          console.table(response.data);
          usersFromApi = response.data;
          const objUser = usersFromApi.find((val) => val.email === data.email);
          return objUser;
        })
        .catch((err) => {
          console.error('error', err);
        })
        .finally(() => console.log('Peticion terminada - action getUserRegisterFromApi.'));
    },
    /* async login({},data){

},
async register({},data){

} */
  },
};
