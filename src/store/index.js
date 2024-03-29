import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import article from './article'
import screen from './screen'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    article,
    screen
  }
})
