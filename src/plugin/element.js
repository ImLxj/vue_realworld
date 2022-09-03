import Vue from 'vue'
import {
  Message,
  Input,
  Form,
  FormItem,
  Button,
  Tabs,
  TabPane
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$message = Message
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
