import { reqGetLogin } from '@/api/axios'
import { getItem, setItem } from '@/utils/storage'
const state = {
  userInfo: {},
  token: getItem()
}
const getters = {}
const mutations = {
  GETUSERLOGIN(state, data) {
    state.userInfo = data // 将用户信息保存到vuex当中
  },
  SETTOKEN(state, token) {
    state.token = token // 将token存入到vuex当中
    setItem('token', token)
  },
  SETUSERNAME(state, username) {
    setItem('username', username)
  },
  SETUSERID(state, userId) {
    setItem('_id', userId)
  }
}
const actions = {
  async getUserLogin({ commit }, params) {
    const result = await reqGetLogin(params)
    if (result.status === 200 && !result.data.errors) {
      commit('SETTOKEN', `Bearer ${result.data.token}`)
      commit('SETUSERNAME', result.data.username)
      commit('SETUSERID', result.data._id)
      delete result.data.token // 将用户的token从列表里面删除
      commit('GETUSERLOGIN', result.data)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
