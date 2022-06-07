<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">登录</h1>
          <p class="text-xs-center">
            <router-link to="/home/register">Have an account?</router-link>
          </p>

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
            />
            <span class="validator" v-show="pawValidator">密码格式不正确</span>
          </fieldset>
          <button
            @click="getLogin"
            class="btn btn-lg btn-primary pull-xs-right"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '1340482172@qq.com',
      password: '123456',
      emValidator: false,
      pawValidator: false
    }
  },
  methods: {
    async getLogin() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.rulesEmail()
      this.rulesPassword()
      if (!this.emValidator && !this.pawValidator) {
        this.$store.dispatch('getUserLogin', user)
        this.$router.push({
          name: 'container'
        })
        return false
      }
    },
    rulesEmail() {
      // 邮箱校验
      const emailValidator =
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (!emailValidator.test(this.email)) {
        // test 用来检测某个字符串是否匹配某个模式
        this.emValidator = true
      } else {
        this.emValidator = false
      }
    },
    rulesPassword() {
      const passwordValidator = /^[0-9]{4,16}$/
      if (!passwordValidator.test(Number.parseInt(this.password))) {
        this.pawValidator = true
      } else {
        this.pawValidator = false
      }
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
