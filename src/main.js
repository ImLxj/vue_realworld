import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import store from './store'
import { dateFormat } from './utils/dateFormat'
import './plugin/element.js'

Vue.config.productionTip = false

// 处理时间的过滤器
Vue.filter('timer', function (value) {
  const jsonDate = new Date(value).toJSON()
  const date = new Date(new Date(jsonDate) + 8 * 3600 * 1000)
  return dateFormat(date)
})

// 删除空格的过滤器
Vue.filter('deleteSpace', function (value) {
  const str = value.replace(/\s*/g, '')
  return str
})

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App)
}).$mount('#app')
