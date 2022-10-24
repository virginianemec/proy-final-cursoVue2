/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import VueForm from 'vue-form';
import { BootstrapVue } from 'bootstrap-vue';

import axios from 'axios';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import router from './router/router';

import store from './store';

// import Login from './views/Login.vue';
import App from './App.vue';
/*
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
*/
import 'bootstrap-vue/dist/bootstrap-vue.css';
/*
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
*/
// import './styles.css';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);
Vue.use(VueForm);

Vue.filter('categoryFilter', (value) => {
  console.log('en el main');
  if (!value) return 'Sin categoria';
  return value.toString().toUpperCase();
});
Vue.filter('dataFilter', (value) => {
  if (!value) return '';
  value = value.toString();
  const arrayDate = value.split('T')[0].split('-');
  // const hora = value.split('T')[1];
  return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
 });

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
