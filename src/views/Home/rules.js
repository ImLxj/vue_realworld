// 邮箱校验
export const rulesEmail = (email) => {
  // 邮箱校验
  const emailValidator =
    /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  if (!emailValidator.test(email)) {
    // test 用来检测某个字符串是否匹配某个模式
    return true
  } else {
    return false
  }
}
// 用户名校验
export const rulesUsername = (username) => {
  const usernameValidator = /^[a-zA-Z0-9_-]{4,16}$/
  if (!usernameValidator.test(username)) {
    return true
  } else {
    return false
  }
}
// 密码校验
export const rulesPassword = (password) => {
  const passwordValidator = /^[0-9]{4,16}$/
  if (!passwordValidator.test(Number.parseInt(password))) {
    return true
  } else {
    return false
  }
}
