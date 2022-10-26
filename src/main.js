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
import App from './App.vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

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
  const arrayDate = value.toString().split('T')[0].split('-');
  return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`;
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
