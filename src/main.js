import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router/router.js'
import axios from 'axios';
import layer from 'vue-layer'

Vue.use(VueRouter);

Vue.prototype.$layer = layer(Vue, {
  msgtime: 3,//目前只有一项，即msg方法的默认消失时间，单位：秒
});

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;

let router = new VueRouter({routes});
new Vue({
  el: '#app',
  router
  , render: h => h(App)
});
