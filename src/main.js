import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


global.Vue = Vue;

Vue.config.productionTip = false;
Vue.prototype.$http= axios;

new Vue({
  render: h => h(App),
}).$mount('#app');
