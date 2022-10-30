import axios from 'axios';

const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/carritos';

export default {
  namespace: true,
  state: {
    carrito: [],
    userOrders: [],
    ordersAll: [],
  },
  getters: {
    getCarrito(state) {
      return state.carrito;
    },
    getUserOrders(state) {
      return state.userOrders;
    },
    getOrdersAll(state) {
      return state.ordersAll;
    },
    getCarritoLength(state) {
      return state.carrito.length;
    },
  },
  mutations: {
    setCarrito(state, payload) {
      state.carrito = payload;
    },
    setUserOrders(state, payload) {
      state.userOrders = payload;
    },
    setOrdersAll(state, payload) {
      state.ordersAll = payload;
    },
    addItem(state, payload) {
      state.carrito.push(payload);
    },
    removeItem(state, payload) {
      state.carrito.splice(payload, 1);
    },
    comprarItem(state, payload) {
      state.carrito[payload].estado = 'COMPRADO';
    },
    devolverItem(state, payload) {
      state.carrito[payload].estado = 'PENDIENTE';
    },
    removeItemPendiente(state, payload) {
      if (state.carrito[payload].estado === 'PENDIENTE') {
        state.carrito.splice(payload, 1);
      }
    },
  },
  actions: {
    async increase({ commit, state, rootGetters }, objEvento) {
      const objIndex = state.carrito.findIndex((val) => (
        val.productId === objEvento.productId && val.estado === 'PENDIENTE'
      ));
      if (objIndex >= 0) {
        if (state.carrito[objIndex].cant >= 0) {
          state.carrito[objIndex].cant += 1;
        }
        /*
        else {
          console.log('en el carrito el producto existe con cantidad < 0.');
        }
        */
      } else {
        // console.log('en el carrito el producto NOOO existe.');
        const userId = parseInt(rootGetters.getUserLoggedId, 10);
        const userLoggued = rootGetters.getUserLoggedName;
        const productToCarrito = {
          createdAt: new Date(),
          user: parseInt(userId, 10),
          userName: userLoggued,
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          cant: 1,
          estado: 'PENDIENTE',
          negocio: objEvento.negocio,
        };

        // console.log('id - price', objEvento.productId, objEvento.productPrice);
        await commit('addItem', productToCarrito);
      }
    },
    async decrease({ commit, state }, objEvento) {
      const objIndex = state.carrito.findIndex((val) => (
        val.productId === objEvento.productId && val.estado === 'PENDIENTE'
      ));
      // console.log('index encontrado para decrementar:', objIndex);
      if (objIndex >= 0) {
        if (state.carrito[objIndex].cant > 1) {
          state.carrito[objIndex].cant -= 1;
        } else {
        /*
          console.log('con cantidad <= 1, lo borra.');
          console.log(
            'id - price',
            objEvento.productId,
            objEvento.productPrice,
          );
          */
          await commit('removeItem', objIndex);
        }
      } /*
      else {
        console.log('el producto a decrementar no existe');
      }
      */
    },
    // comprar -> estado: COMPRADO, o volver a estado: pendiente.
    async carritoComprarDevolver({ state, dispatch }, objData) {
      await Promise.all(
        state.carrito.map(async (element) => {
          element.estado = objData.accion === 'comprar' ? 'COMPRADO' : 'PENDIENTE';

          if (element.id) {
            const valId = element.id;
            axios
              .put(`${URL}/${valId}`, element)
              .catch((error) => {
                console.log(error);
              });
          } else {
            axios
              .post(`${URL}`, element)
              .catch((error) => {
                console.log(error);
              });
          }
        }),
      );
      await dispatch('carritoUserFromApi');
    },
    async carritoUserFromApi({ commit, rootGetters }) {
      // busco en la Api todos los registros carrito que corresponden al usuario.
      const userId = parseInt(rootGetters.getUserLoggedId, 10);
      await axios
        .get(`${URL}/?user=${userId}`)
        .then(async (response) => {
          const arrayCarrito = response.data;
          await commit(
            'setCarrito',
            arrayCarrito.filter((item) => item.estado === 'PENDIENTE'),
          );
          await commit(
            'setUserOrders',
            arrayCarrito.filter((item) => item.estado === 'COMPRADO'),
          );
        })
        .catch((error) => {
          commit('setCarrito', []);
          commit('setUserOrders', []);
          console.log(error);
        });
    },
    async resetCarritoUser({ state, dispatch }) {
      await Promise.all(
        state.carrito.map((element) => {
          if (element.id) {
            axios
              .delete(`${URL}/${element.id}`)
              .then((response) => {
                console.table(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }),
      );
      await dispatch('carritoUserFromApi');
    },
    async getOrdersFromApi({ commit }, id) {
      await axios
        .get(`${URL}/?negocio=${id}`)
        .then(async (response) => {
          const arrayCarrito = response.data;
          const result = await arrayCarrito.filter(
            (todo) => todo.estado === 'COMPRADO',
          );
          await commit('setNegocioOrders', { id, orders: result });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getOrdersAllFromApi({ commit }, data) {
      // este metodo retorna el conjunto de registros de los carritos del sistema
      const urlCarritos = data.admin ? URL : `${URL}/?user=${data.id}`;
      // si el user es admin, rae todos,
      // sino los del usuario.
      await axios
        .get(urlCarritos)
        .then(async (response) => {
          const arrayCarrito = response.data;
          const result = await arrayCarrito.filter(
            (todo) => todo.estado === 'COMPRADO',
          );
          await commit('setOrdersAll', result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async setCarritoTemp({ state }) {
      await Promise.all(
        state.carrito.map(async (element) => {
          if (element.id) {
            const valId = element.id;
            axios
              .put(`${URL}/${valId}`, element)
              .catch((error) => {
                console.log(error);
              });
          } else {
            axios
              .post(`${URL}`, element)
              .catch((error) => {
                console.log(error);
              });
          }
        }),
      );
    },
  },
};
