/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import VueForm from 'vue-form';

import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);
Vue.use(VueForm);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
