import Vue from 'vue';
import VueSimpleAlert from 'vue-simple-alert';
import VueForm from 'vue-form';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

Vue.config.productionTip = false;
Vue.use(VueSimpleAlert);
Vue.use(VueForm);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
