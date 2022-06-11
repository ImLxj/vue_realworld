import instance from './index'

// 发送文章请求
export const reqGetArticle = (option) => {
  return instance({
    method: 'GET',
    url: 'articles',
    params: option
  })
}

// 发送获取当前用户文章请求
export const reqGetUserArticle = (authorId) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    url: `articles/feed/${authorId}`,
    method: 'GET',
    headers: { authorization: token }
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
  delete option.userInfo.bio
  delete option.userInfo.email
  delete option.userInfo.token
  const userInfo = [
    option.userInfo._id,
    option.userInfo.username,
    option.userInfo.image
  ]
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  return instance({
    method: 'POST',
    url: `articles/${option.id}/comments`,
    data: {
      comment: {
        body: option.comment,
        userInfo
      }
    },
    headers: { authorization: token }
  })
}

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
