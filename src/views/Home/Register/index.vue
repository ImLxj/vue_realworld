<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="auth-center col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center title">注册</h1>
          <p class="text-xs-center">
            <router-link to="/home/login">Have an account?</router-link>
          </p>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="username"
                @blur="rulesUsername"
              />
              <span class="validator" v-show="!usernameValidator"
                >用户名格式不正确</span
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
                @blur="rulesEmail"
              />
              <span class="validator" v-show="!emailValidator"
                >邮箱格式不正确</span
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                autocomplete
                v-model="password"
                @blur="rulesPassword"
              />
              <span class="validator" v-show="!passwordValidator"
                >密码格式不正确</span
              >
            </fieldset>
            <button
              @click.prevent="getRegister"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
    <template>
      <div v-for="(count, index) in clickCount" :key="index + 'register'">
        <Bounced v-if="isLogin" :message="message" :type="type" />
      </div>
    </template>
  </div>
</template>

<script>
import { rulesEmail, rulesPassword, rulesUsername } from '@/utils/rules'
import { reqGetRegister } from '@/api/axios'
import '@/assets/css/user-style.css'
import Bounced from '@/components/Bounced'
export default {
  name: 'Register',
  components: { Bounced },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      usernameValidator: Boolean,
      passwordValidator: Boolean,
      emailValidator: Boolean,
      isLogin: false,
      message: '请登录',
      clickCount: 0,
      type: 'alert-danger'
    }
  },
  methods: {
    async getRegister() {
      this.rulesEmail()
      this.rulesPassword()
      this.rulesUsername()
      if (
        this.emailValidator &&
        this.passwordValidator &&
        this.usernameValidator
      ) {
        const result = await reqGetRegister({
          username: this.username,
          email: this.email,
          password: this.password
        })
        console.log(result)
        if (result.status === 201) {
          this.$router.push('/home/login')
          this.clickCount = 0
          this.isLogin = false
        } else {
          this.clickCount += 1
          this.message = result.message
          this.isLogin = true
        }
      }
      /* this.emailValidator = rulesEmail(this.email)
      this.passwordValidator = rulesPassword(this.password)
      this.usernameValidator = rulesUsername(this.username)
      if (!this.usernameValidator && !this.emailValidator && !this.passwordValidator) {
        const result = await reqGetRegister({
          username: this.username,
          email: this.email,
          password: this.password
        })
        if (result.status === 200) {
          const error = result.data.errors
          error.forEach((item) => {
            // 注意点：给子组件是data里面的响应式数据，这样当最后一个错误改变message的内容 所有的弹框内容都会发生改变,解决这种方法就是向子组件传递函数。
            this.clickCount += 1
            this.message = item.msg
            this.isLogin = true
          })
        }
        if (result.status === 201) {
          this.$router.push('/home/login')
          this.clickCount = 0
          this.isLogin = false
        }
      } */
    },
    rulesEmail() {
      this.emailValidator = rulesEmail(this.email)
    },
    rulesPassword() {
      this.passwordValidator = rulesPassword(this.password)
    },
    rulesUsername() {
      this.usernameValidator = rulesUsername(this.username)
    }
  }
}
</script>
<style lang="less" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1,
p {
  text-align: center;
}

p a {
  color: #5cb85c;
}

p a:hover {
  color: green;
}

input {
  height: 55px !important;
  box-shadow: none !important;
  margin-top: 10px;
}

.btn {
  background: #5cb85c;
  border: none !important;
  float: right;
  outline: none !important;
}

.btn:hover {
  background: green;
}
.validator {
  color: red;
  font-size: 12px;
  position: absolute;
  font-weight: 100;
  margin-left: 3px;
}
</style>
