import { reqGetArticle, reqGetUserArticle } from '@/api/axios'

const state = {
  articleList: []
}
const getters = {}
const mutations = {
  GETARTICLELIST(state, data) {
    state.articleList = data.articles ? data.articles : data
  }
}
const actions = {
  async getArticleList(context) {
    const result = await reqGetArticle()
    if (result.status === 200) {
      context.commit('GETARTICLELIST', result.data)
    }
  },
  async getUserArticle(context, authorId) {
    const result = await reqGetUserArticle(authorId)
    console.log(result)
    if (!result) {
      return console.log('没有返回任何数据')
    }
    if (result.status === 200) {
      context.commit('GETARTICLELIST', result.data)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
