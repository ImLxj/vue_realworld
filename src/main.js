import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './api/index'
import 'nprogress/nprogress.css'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$http = axios

// 处理时间的过滤器
Vue.filter('timer', function (value) {
  const jsonDate = new Date(value).toJSON()
  return new Date(new Date(jsonDate) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
})

// 删除空格的过滤器
Vue.filter('deleteSpace', function (value) {
  const str = value.replace(/\s*/g, '')
  return str
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
