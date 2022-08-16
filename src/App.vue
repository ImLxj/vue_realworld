<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { reqProfiles } from './api/axios'
export default {
  name: 'App',
  mounted() {
    this.user()
  },
  methods: {
    // 如果本地存储当中有当前用户信息发起请求让用户仓库里面拥有信息
    async user() {
      const userId = window.localStorage.getItem('_id')
      if (userId === null) return
      const res = await reqProfiles(userId)
      if (res.status === 200) {
        this.$store.commit('GETUSERLOGIN', res.data.profile)
      }
    }
  }
}
</script>
