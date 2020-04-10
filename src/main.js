// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'


Vue.prototype.axios = axios;
Vue.prototype.HOST = '/api';
axios.defaults.baseURL = '/api';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['XPS-Version'] = '1.0.0'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(Vuex);

Vue.config.productionTip = false;
sessionStorage.mediaUrl = 'http://localhost:3000';
Vue.prototype.$socket = io.connect('127.0.0.1:3000');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
