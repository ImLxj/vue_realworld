import { reqGetLogin, reqUpdateUserInfo } from '@/api/axios'
const state = {
  userInfo: {}
}
const getters = {}
const mutations = {
  GETUSERLOGIN(state, data) {
    state.userInfo = data
  }
}
const actions = {
  async getUserLogin({ commit }, params) {
    const result = await reqGetLogin(params)
    if (result.status === 200) {
      commit('GETUSERLOGIN', result.data)
      const token = `Bearer ${result.data.token}`
      window.sessionStorage.setItem('token', token)
    }
  },
  async updateUserInfo({ commit }, params) {
    const result = await reqUpdateUserInfo(params)
    console.log(result)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
