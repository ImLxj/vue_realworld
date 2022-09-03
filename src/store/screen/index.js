const state = {
  screenWidth: document.documentElement.clientWidth
}

const mutations = {
  CHANGEWIDTH(state, param) {
    state.screenWidth = param
  }
}

export default {
  state,
  mutations
}
