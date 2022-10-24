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
      // state.carrito = [];
      state.carrito = payload;
    },
    setUserOrders(state, payload) {
      // state.userOrders = [];
      state.userOrders = payload;
    },
    setOrdersAll(state, payload) {
      // state.ordersAll = [];
      state.ordersAll = payload;
    },
    addItem(state, payload) {
      state.carrito.push(payload);
      // state.carrito[payload].cant += 1;
    },
    removeItem(state, payload) {
      state.carrito.splice(payload, 1);
      // state.carrito[payload].cant -= 1;
    },
    comprarItem(state, payload) {
      state.carrito[payload].estado = 'COMPRADO';
    },
    devolverItem(state, payload) {
      state.carrito[payload].estado = 'PENDIENTE';
    },
    removeItemPendiente(state, payload) {
      if (state.carrito[payload].estado === 'PENDIENTE') { state.carrito.splice(payload, 1); }
      // state.carrito[payload].cant -= 1;
    },
  },
  actions: {
    async increase({ commit, state }, objEvento) {
      console.log('increse');
      console.table(objEvento);
      console.log('--carrito--');
      const objIndex = state.carrito.findIndex((val, index) => {
        console.log(index);
        console.table(val);
        return (
          val.productId === objEvento.productId && val.estado === 'PENDIENTE'
        );
      });
      console.log('index encontrado:', objIndex);
      if (objIndex >= 0) {
        console.log('en el carrito el pruducto existe.');
        if (state.carrito[objIndex].cant >= 0) {
          console.log('con cant >= 0');
          // await commit('addItem', objIndex);
          state.carrito[objIndex].cant += 1;
          /*
          const { id } = state.carrito[objIndex];
          await axios
            .put(`${URL}/${id}`, state.carrito[objIndex])
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
            */
        } else {
          console.log('en el carrito el producto existe con cantidad < 0.');
        }
      } else {
        console.log('en el carrito el producto NOOO existe.');
        const productToCarrito = {
          createdAt: new Date(),
          user: parseInt(objEvento.userId, 10),
          productId: objEvento.productId,
          productName: objEvento.productName,
          productPrice: objEvento.productPrice,
          cant: 1,
          estado: 'PENDIENTE',
          negocio: objEvento.negocio,
        };

        console.log('id - price', objEvento.productId, objEvento.productPrice);
        await commit('addItem', productToCarrito);
        /*
  await axios
        .post(`${URL}/`, productToCarrito)
        .then((response) => {
          console.log('se agrego al carrito el producto');
          console.table(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    */
      }
    },
    async decrease({ commit, state }, objEvento) {
      console.log('decrease');
      console.table(objEvento);
      console.log('--carrito--');
      const objIndex = state.carrito.findIndex((val, index) => {
        console.log(index);
        console.table(val);
        return (
          val.productId === objEvento.productId && val.estado === 'PENDIENTE'
        );
      });
      console.log('index encontrado para decrementar:', objIndex);
      if (objIndex >= 0) {
        console.log('en el carrito el producto SIIIII existe.');
        if (state.carrito[objIndex].cant > 1) {
          console.log('con cantidad > 1');
          // await commit('removeItem', objIndex);
          state.carrito[objIndex].cant -= 1;
          /*
    const { id } = state.carrito[objIndex];
        await axios
          .put(`${URL}/${id}`, state.carrito[objIndex])
          .then((response) => {
            console.log('modificco la cantidad del producto,.');
            console.table(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      */
        } else {
          console.log('con cantidad <= 1, lo borra.');
          console.log(
            'id - price',
            objEvento.productId,
            objEvento.productPrice,
          );
          await commit('removeItem', objIndex);
          /*
  const { id } = state.carrito[objIndex];
          await axios
            .delete(`${URL}/${id}`)
            .then((response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
*/
        }
      } else {
        console.log('el producto a decrementar no existe');
      }
    },
    // comprar -> estado: COMPRADO, o volver a estado: pendiente.
    async carritoComprarDevolver({ commit, state, dispatch }, objData) {
      // await dispatch('carritoUserFromApi', objData.userId);
      await Promise.all(
        state.carrito.map(async (element, index) => {
          element.estado = objData.accion === 'comprar' ? 'COMPRADO' : 'PENDIENTE';

          if (element.id) {
            const valId = element.id;
            await axios
              .put(`${URL}/${valId}`, element)
              .then((response) => {
                console.log('se modifico al carrito el producto');
                console.table(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            await axios
              .post(`${URL}/`, element)
              .then((response) => {
                console.log('se agrego al carrito el producto');
                console.table(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }),
      );
      // await dispatch('carritoUserFromApi', objData.userId);
    },
    async carritoUserFromApi({ commit }, userId) {
      // busco en la Api todos los registros carrito que corresponden al usuario.
      await axios
        .get(`${URL}/?user=${userId}`)
        .then(async (response) => {
          console.table(response.data);
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
    async resetCarritoUser({ state, dispatch }, userId) {
      await dispatch('carritoUserFromApi', userId);
      await Promise.all(
        state.carrito.map(async (element) => {
          axios
            .delete(`${URL}/${element.id}`)
            .then(async (response) => {
              console.table(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }),
      );
      await dispatch('carritoUserFromApi', userId);
    },
    async getOrdersFromApi({ commit }, id) {
      await axios
        .get(`${URL}/?negocio=${id}`)
        .then(async (response) => {
          console.table(response.data);
          const arrayCarrito = response.data;
          const result = await arrayCarrito.filter(
            (todo) => todo.estado === 'COMPRADO',
          );
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
      const urlCarritos = data.admin ? URL : `${URL}/?user=${data.id}`;
      // si el user es admin, rae todos,
      // sino los del usuario.
      await axios
        .get(urlCarritos)
        .then(async (response) => {
          console.table(response.data);
          const arrayCarrito = response.data;
          const result = await arrayCarrito.filter(
            (todo) => todo.estado === 'COMPRADO',
          );
          console.table(result);
          await commit('setOrdersAll', result);
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
  modules: {},
};
