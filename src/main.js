/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import VueForm from 'vue-form';

import axios from 'axios';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import router from './router/router';

// import Login from './views/Login.vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);
Vue.use(VueForm);

// const router = new VueRouter({routes, mode: 'history'});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
