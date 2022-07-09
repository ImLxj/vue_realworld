// 添加本地存储
export const setItem = (key, value) => {
  window.localStorage.setItem(key, value)
}
// 获取本地存储
export const getItem = (key) => {
  return window.localStorage.getItem(key)
}
// 删除本地存储
export const removeItem = () => {
  window.localStorage.clear()
}
