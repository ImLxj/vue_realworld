import instance from './index'

// 发送文章请求
export const reqGetArticle = (option) => {
  return instance({
    method: 'GET',
    url: 'articles',
    params: option
  })
}

// 发送创建文章的请求
export const reqCreateArticle = (articleInfo) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    url: 'articles',
    method: 'POST',
    data: {
      article: articleInfo
    },
    headers: { authorization: token }
  })
}

// 我喜欢的文章
export const reqUpdateArticle = (article) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    url: `articles/${article._id}/favorite`,
    method: 'POST',
    headers: { authorization: token }
  })
}

// 添加评论
export const reqCurrentArticle = (option) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    method: 'POST',
    url: `articles/${option.id}/comments`,
    data: {
      comment: {
        body: option.comment,
        author: option.author,
        articleId: option.articleId
      }
    },
    headers: { authorization: token }
  })
}

// 获取评论
export const reqComments = (articleId) =>
  instance(`articles/${articleId}/comments`)

// 获取文章
export const reqArticle = (articleId) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    method: 'GET',
    url: `articles/${articleId}`,
    headers: { authorization: token }
  })
}

// 发送登录请求
export const reqGetLogin = (params) =>
  instance.post('users/login', { user: params })

// 发送注册请求
export const reqGetRegister = (params) =>
  instance.post('users', { user: params })

// 发送修改个人信息请求
export const reqUpdateUserInfo = (params) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    method: 'PUT',
    url: 'user',
    data: {
      userInfo: params
    },
    headers: { authorization: token }
  })
}

// 发送获取当前登录用户的个人信息
export const reqUserInfo = () => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    method: 'GET',
    url: 'user',
    headers: { authorization: token }
  })
}
