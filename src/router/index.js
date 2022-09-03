import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import MyContainer from '../views/Home/MyContainer'
import CreateArticle from '../views/Home/CreateArticle'
import Login from '../views/Login'
import Register from '../views/Register'
import MyArticle from '../views/Home/MyContainer/MyArticle'
import Setting from '../views/Home/Setting'
import Information from '../views/Home/Information'

// 先保存push 和 replace 方法
const originPush = VueRouter.prototype.push

// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/container'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'container',
        name: 'container',
        component: MyContainer
      },
      {
        path: 'createarticle',
        name: 'createarticle',
        component: CreateArticle,
        meta: { validator: true }
      },
      {
        path: 'myarticle',
        name: 'myarticle',
        component: MyArticle
        // meta: { validator: true },
        // 判断是否是点击跳转的 如果不是点击跳转的则还是当前页面
        // beforeEnter: (to, from, next) => {
        //   if (!to.params.id) {
        //     next('/home/container')
        //   }
        //   next()
        // }
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting,
        meta: { validator: true }
      },
      {
        path: 'information',
        name: 'information',
        component: Information,
        meta: { validator: true },
        beforeEnter: (to, from, next) => {
          if (!to.params._id) {
            next('/home/container')
          }
          next()
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.validator) {
    if (!window.localStorage.token) {
      return this.$message({
        message: '请登录',
        type: 'warning'
      })
    }
  }
  next()
})

export default router
