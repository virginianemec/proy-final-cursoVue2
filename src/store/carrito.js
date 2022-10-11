/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const URL = 'https://632ba1f21aabd8373989647d.mockapi.io/carritos';

export default {
  namespace: true,
  state: {
    carrito: [],
  },
  getters: {
    getCarrito(state) {
      return state.carrito;
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
    addItem(state, payload) {
      state.carrito[payload].cant += 1;
    },
    removeItem(state, payload) {
      state.carrito[payload].cant -= 1;
    },
    comprarItem(state, payload) {
      state.carrito[payload].estado = 'PEDIDO';
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
          await this.put(idProducto, objEvento);
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
    // comprar -> estado: pedido, o volver a estado: pendiente.
    async carritoComprarDevolver({ commit, state }, accion) {
      await state.carrito.forEach(async (element, index) => {
        const valId = element.id;
        element.estado = (accion === 'comprar') ? 'PEDIDO' : 'PENDIENTE';

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
      await axios
        .get(`${URL}/?user=${userId}`)
        .then(async (response) => {
          console.table(response.data);
          await commit('setCarrito', response.data);
        })
        .catch((error) => {
          commit('setCarrito', []);
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
        element.estado = 'PEDIDO';
        // await commit('comprarDevolverItem', index), accion;
        await axios
          .delete(`${URL}/${element.id}`)
          // .put(`${URL}/${valId}`, element)
          .then((response) => {
            console.table(response.data);
            let arrayNegocios = rootGetters.getAllNegocios();
            const negocio = arrayNegocios.find((item) => item.id === parseInt(negocioId, 10));
            if (negocio) negocio.orders.push(element);
          })
          .catch((error) => {
            console.log(error);
          });
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
