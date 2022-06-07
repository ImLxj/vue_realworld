import {
  reqGetArticle,
  reqGetUserArticle,
  reqCurrentArticle
} from '@/api/axios'

const state = {
  articleList: [],
  articleInfo: {}
}
const getters = {}
const mutations = {
  GETARTICLELIST(state, data) {
    state.articleList = data.articles ? data.articles : data
  },
  GETCOMMENT(state, data) {
    state.articleInfo = data.article
  }
}
const actions = {
  // 获取文章列表
  async getArticleList(context) {
    const result = await reqGetArticle()
    if (result.status === 200) {
      context.commit('GETARTICLELIST', result.data)
    }
  },
  // 获取当前登录用户发布的文章
  async getUserArticle(context, authorId) {
    const result = await reqGetUserArticle(authorId)
    console.log(result)
    if (!result) {
      return console.log('没有返回任何数据')
    }
    if (result.status === 200) {
      context.commit('GETARTICLELIST', result.data)
    }
  },
  // 获取评论信息
  async getComment(context, option) {
    const result = await reqCurrentArticle(option)
    if (result.status === 201) {
      context.commit('GETCOMMENT', result.data)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}