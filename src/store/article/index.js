import { reqGetArticle, reqCurrentArticle } from '@/api/axios'

const state = {
  articleList: [],
  articleInfo: {},
  articlesCount: 0
}
const getters = {
  tagList(state) {
    let tagList = ''
    state.articleList.forEach((item, index) => {
      tagList += item.tagList.join(',') + ','
    })
    tagList = tagList.slice(0, tagList.lastIndexOf(',')).split(',')
    // 通过es6新语法 set 方法对数组进行去重
    tagList = Array.from(new Set(tagList))
    return tagList
  }
}
const mutations = {
  GETARTICLELIST(state, data) {
    state.articleList = data.articles ? data.articles : data
    state.articlesCount = data.articlesCount
  }
}
const actions = {
  // 获取文章列表
  async getArticleList(context, option) {
    const result = await reqGetArticle(option)
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
