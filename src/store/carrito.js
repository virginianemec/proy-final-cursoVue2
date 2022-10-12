/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
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
      state.carrito = [];
      state.carrito = payload;
    },
    setUserOrders(state, payload) {
      state.userOrders = [];
      state.userOrders = payload;
    },
    setOrdersAll(state, payload) {
      state.ordersAll = [];
      state.ordersAll = payload;
    },
    addItem(state, payload) {
      state.carrito[payload].cant += 1;
    },
    removeItem(state, payload) {
      state.carrito[payload].cant -= 1;
    },
    comprarItem(state, payload) {
      state.carrito[payload].estado = 'COMPRADO';
    },
    /*
    devolverItem(state, payload) {
      state.carrito[payload].estado = 'PENDIENTE';
    },
    */
  },
  actions: {
    async updateCarrito({ commit, context }, objProdCant) {
      if (objProdCant.updateFuntion === '+') {
        context.increase(objProdCant);
      } else {
        context.decrease(objProdCant);
      }
    },
    async increase({ commit, state }, objEvento) {
      const objIndex = state.carrito.findIndex((val) => val.productId === objEvento.productId && val.estado === 'PENDIENTE');
      if (objIndex >= 0) {
        if (state.carrito[objIndex].cant >= 0) {
          await commit('addItem', objIndex);
          const idProducto = state.carrito[objIndex].id;
          await axios
            .put(`${URL}/${idProducto}`, state.carrito[objIndex])
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          // await this.put(idProducto, state.carrito[objIndex]);
        }
      } else {
        const productToCarrito = {
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          user: parseInt(objEvento.userId, 10),
          cant: 1,
          createdAt: new Date(),
          estado: 'PENDIENTE',
        };

        console.log('id - price', objEvento.productId, objEvento.productPrice);
        await axios
          .post(`${URL}/`, productToCarrito)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

        // await this.post(productToCarrito);
      }
    },
    async decrease({ commit, state }, objEvento) {
      const objIndex = state.carrito.findIndex((val) => val.productId === objEvento.productId && val.estado === 'PENDIENTE');
      if (objIndex >= 0) {
        if (state.carrito[objIndex].cant > 1) {
          await commit('removeItem', objIndex);
          const idProducto = state.carrito[objIndex].id;
          await axios
            .put(`${URL}/${idProducto}`, objEvento)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          // await this.put(idProducto, objEvento);
        } else {
          console.log('id - price', objEvento.productId, objEvento.productPrice);
          const idProducto = state.carrito[objIndex].id;

          await axios
            .delete(`${URL}/${idProducto}`)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          // await this.delete(idProducto);
        }
      }
    },
    // comprar -> estado: COMPRADO, o volver a estado: pendiente.
    async carritoComprarDevolver({ commit, state }, accion) {
      await state.carrito.forEach(async (element, index) => {
        const valId = element.id;
        element.estado = (accion === 'comprar') ? 'COMPRADO' : 'PENDIENTE';

        // await commit('comprarDevolverItem', index), accion;

        await axios
          .put(`${URL}/${valId}`, element)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async carritoUserFromApi({ commit }, userId) {
      // busco en la Api todos los registros carrito que corresponden al usuario.
      await axios
        .get(`${URL}/?user=${userId}`)
        .then(async (response) => {
          console.table(response.data);
          // let arrayCarrito = response.data;
          await commit('setCarrito', response.data.filter((item) => item.estado === 'PENDIENTE'));
          await commit('setUserOrders', response.data.filter((item) => item.estado === 'COMPRADO'));
          // await commit('setCarrito', response.data);
        })
        .catch((error) => {
          commit('setCarrito', []);
          commit('setUserOrders', []);
          console.log(error);
        });
    },
    async resetCarritoUser({ state }) {
      await state.carrito.forEach(async (element) => {
        await axios
          .delete(`${URL}/${element.id}`)
          .then((response) => {
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async carritoComprar1({ commit, state, rootGetters }, accion) {
      // comprar: toma cada producto, y actualiza las ordenes para cada negocio dueño dle producto.
      await state.carrito.forEach(async (element, index) => {
        const valId = element.id;
        const negocioId = element.negocio;
        element.estado = 'COMPRADO';
        // await commit('comprarDevolverItem', index), accion;
        await axios
        // .delete(`${URL}/${element.id}`)
          .put(`${URL}/${valId}`, element)
          .then((response) => {
            console.table(response.data);
            // const arrayNegocios = rootGetters.getAllNegocios();
            // const negocio = arrayNegocios.find((item) => item.id === parseInt(negocioId, 10));
            // if (negocio) negocio.orders.push(element);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async getOrdersFromApi({ commit }, id) {
      await axios
        .get(`${URL}/?negocio=${id}`)
        .then(async (response) => {
          console.table(response.data);
          const result = await response.data.filter((todo) => todo.estado === 'COMPRADO');
          console.table(result);
          await commit('setNegocioOrders', { id, orders: result });
          // return result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getOrdersAllFromApi({ commit, state }, data) {
      // este metodo retorna el conjunto de registros de los carrits del sistema
      const urlCarritos = (data.isAmin) ? URL : `${URL}/?user=${data.id}`;
      // si el user es admin, rae todos,
      // sino los del usuario.
      await axios
        .get(urlCarritos)
        .then(async (response) => {
          console.table(response.data);
          const result = await response.data.filter((todo) => todo.estado === 'COMPRADO');
          console.table(result);
          await commit('setOrdersAll', result);
          // return result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*
    deleteTodo(id){
        axios.delete(`url/todos/${id}`)
        .then(res => this.todos = this.todos.filter(todo => todo.id !== id))
        .catch(err => console.log(err));
        //this.todos = this.todos.filter(todo => todo.id !== id);
    } // si el metodo estuviene sen otro modulo: dispatch("movement/goForward", speed, { root: true });
    */
  },
  modules: {
  },
};
