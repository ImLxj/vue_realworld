<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">登录</h1>
          <p class="text-xs-center">
            <router-link to="/home/register">Have an account?</router-link>
          </p>
          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                @blur="rulesEmail"
                v-model="email"
              />
              <span class="validator" v-show="emValidator">邮箱格式不正确</span>
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                @blur="rulesPassword"
                autocomplete
                v-model="password"
                aut
              />
              <span class="validator" v-show="pawValidator"
                >密码格式不正确</span
              >
            </fieldset>
            <button
              @click.prevent="getLogin"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
    <template>
      <div v-for="(count, index) in clickCount" :key="index + 'login'">
        <Bounced v-if="isLogin" :message="message" />
      </div>
    </template>
  </div>
</template>

<script>
import { rulesEmail, rulesPassword } from '@/views/Home/rules'
import Bounced from '@/components/Bounced'
export default {
  name: 'Login',
  components: { Bounced },
  data() {
    return {
      email: '1340482172@qq.com',
      password: '123456',
      emValidator: false,
      pawValidator: false,
      isLogin: false,
      message: '请登录',
      clickCount: 0
    }
  },
  methods: {
    async getLogin() {
      const user = {
        email: this.email,
        password: this.password
      }
      // this.rulesEmail()
      this.emValidator = rulesEmail(this.email)
      this.pawValidator = rulesPassword(this.password)
      if (!this.emValidator && !this.pawValidator) {
        this.$store.dispatch('getUserLogin', user)
        setTimeout(() => {
          // 判断是否登录成功
          if (!this.$store.state.user.userInfo.username) {
            this.message = '当前邮箱不存在,请注册之后在登录'
            this.isLogin = true
            this.clickCount += 1
            return false
          }
          this.$router.push({
            name: 'container'
          })
          this.isLogin = false
          this.clickCount = 0
        }, 500)
      }
    },
    rulesEmail() {
      this.emValidator = rulesEmail(this.email)
    },
    rulesPassword() {
      this.pawValidator = rulesPassword(this.password)
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
.validator {
  color: red;
  font-size: 12px;
  position: absolute;
  font-weight: 100;
  margin-left: 3px;
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
</style>
