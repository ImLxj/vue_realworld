import instance from './index'

// 发送文章请求
export const reqGetArticle = () => instance.get('articles')

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

// 发送船舰文章的请求
export const reqCreateArticle = (articleInfo) => {
  const token = window.sessionStorage.getItem('token')
  if (!token) return console.log('请登录')
  console.log(articleInfo)
  return instance({
    url: 'articles',
    method: 'POST',
    data: {
      article: articleInfo
    },
    headers: { authorization: token }
  })
}

// 发送登录请求
export const reqGetLogin = (params) =>
  instance.post('users/login', { user: params })

// 发送注册请求
export const reqGetRegister = (params) =>
  instance.post('users', { user: params })
