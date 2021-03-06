import axios from 'axios'
import nprogress from 'nprogress'
import { getItem } from '@/utils/storage'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    nprogress.start()
    const token = getItem('token')
    if (token) {
      config.headers.Authorization = token // 如果已经登录则添加请求头
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    nprogress.done()
    if (response.data.error) {
      window.localStorage.clear()
      return {
        status: 401,
        message: '登录超时'
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
