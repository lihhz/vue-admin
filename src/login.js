import Vue from 'vue'
import VueRouter from 'vue-router';
import axios from 'axios';
import layer from 'vue-layer'

Vue.use(VueRouter);

Vue.prototype.$layer = layer(Vue, {
  msgtime: 3,//目前只有一项，即msg方法的默认消失时间，单位：秒
});

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config => {
  return config;
}, err => {
  layer.msg('请求超时!');
  return Promise.resolve(err);
});

axios.interceptors.response.use(data => {
  // if (data.status && data.status === 200 && data.data.status === 'error') {
  //   layer.msg(data.data.msg);
  //   return;
  // }
  return data;
}, err => {
  if (err.response && err.response.status) {
    alert('网络错误！错误代码:' + err.response.status);
  } else {
    alert('未知错误!');
  }
  return Promise.resolve(err);
});

Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  render: h => h(App)
});
