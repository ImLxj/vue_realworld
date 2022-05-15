import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import MyContainer from '../views/Home/MyContainer'
import CreateArticle from '../views/Home/CreateArticle'
import MyProfile from '../views/Home/MyProfile'
import Login from '../views/Home/Login'
import Register from '../views/Home/Register'

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
        path: 'myprofile',
        name: 'myprofile',
        component: MyProfile,
        meta: { validator: true }
      },
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: 'register',
        name: 'register',
        component: Register
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.validator) {
    if (!window.localStorage.token) {
      return console.log('请登录')
    }
  }
  next()
})

export default router
