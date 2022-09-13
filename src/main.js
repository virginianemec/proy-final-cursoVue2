import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
