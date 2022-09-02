import Vue from 'vue'
import { Message, Input, Form, FormItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$message = Message
