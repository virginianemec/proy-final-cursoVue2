import axios from 'axios';

const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/users';

export default {
  namespace: true,
  state: {
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
    isAdmin(state) {
      return state.userLogged.rol === 'admin';
    },
    getUserLoggedId(state) {
      return state.userLogged.id;
    },
    getUserLoggedName(state) {
      return state.userLogged.name;
    },
  },
  mutations: {
    setUserLogged(state, payload) {
      state.userLogged = payload;
    },
    logoutUser(state) {
      state.userLogged = {
        email: '',
        name: '',
        password: 'user', // user, admin
        rol: false,
        id: '',
      };
      state.isAdmin = false;
    },
  },
  actions: {
    async getUsersFromApi({ commit }, objUserToLoging) {
      const data = {
        email: objUserToLoging.email,
      };
      let usersFromApi = [];
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
    async getUserRegisterFromApi(objUserToLoging) {
      const data = {
        email: objUserToLoging.email,
      };
      let usersFromApi = [];
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
  },
};
