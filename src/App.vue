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
