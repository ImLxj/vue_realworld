import axios from 'axios'
import nprogress from 'nprogress'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    nprogress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    nprogress.done()
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
