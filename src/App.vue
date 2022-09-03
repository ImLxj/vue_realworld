<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { reqUserInfo } from './api/axios'
export default {
  name: 'App',
  mounted() {
    this.user()
    // 挂载window.onresize
    const _this = this // 缓存vue实例
    // 节流函数
    function throttle(fn, wait) {
      let timer = null
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            fn()
            timer = null
          }, wait)
        }
      }
    }
    function changeScreen() {
      _this.$store.commit('CHANGEWIDTH', document.documentElement.clientWidth)
    }
    window.addEventListener('resize', throttle(changeScreen, 100))
  },
  methods: {
    // 如果本地存储当中有当前用户信息发起请求让用户仓库里面拥有信息
    async user() {
      const res = await reqUserInfo()
      console.log(res)
      if (res.status === 200) {
        this.$store.commit('GETUSERLOGIN', res.data.user)
      }
    }
  }
}
</script>
