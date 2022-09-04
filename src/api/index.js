import axios from 'axios'
import nprogress from 'nprogress'
import { getItem } from '@/utils/storage'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
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
    try {
      nprogress.done()
      if (response.data.error) {
        window.localStorage.clear() // 超过token登录时间自动清除之前用户信息
        return {
          status: 401,
          message: '登录超时'
        }
      } else if (response.data.errors) {
        return {
          message: response.data.errors[0].msg
        }
      }
      return response
    } catch (error) {
      return error
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
