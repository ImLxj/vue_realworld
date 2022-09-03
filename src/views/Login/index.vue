<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div
          class="col-md-8 col-md-offset-2 col-lg-offset-3 col-lg-6 col-xs-10 col-xs-offset-1"
        >
          <h1 class="text-xs-center" style="color: white; font-weight: bold">
            登录
          </h1>
          <p class="text-xs-center" style="margin-bottom: 20px">
            <router-link to="/register">没有账号请点击我！</router-link>
          </p>
          <el-form
            :model="loginUser"
            :rules="loginRules"
            ref="loginRefs"
            class="demo-ruleForm"
          >
            <el-form-item prop="email">
              <el-input
                v-model="loginUser.email"
                placeholder="请输入邮箱"
                style="
                  background-color: transparent !important;
                  border: none;
                  outline: none;
                "
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginUser.password"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <button
              @click.prevent="getLogin"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign up
            </button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqGetLogin } from '@/api/axios'
export default {
  name: 'Login',
  data() {
    return {
      loginUser: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, message: '请输入正确的邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getLogin() {
      this.$refs.loginRefs.validate(async (valid) => {
        // 表单验证通过
        if (valid) {
          const result = await reqGetLogin(this.loginUser)
          if (result.status === 200) {
            this.$store.commit('SETTOKEN', `Bearer ${result.data.token}`)
            this.$store.commit('SETUSERNAME', result.data.username)
            this.$store.commit('SETUSERID', result.data._id)
            delete result.data.token // 将用户的token从列表里面删除
            this.$store.commit('GETUSERLOGIN', result.data)
            this.$router.push('/')
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 2000
            })
            return
          }
          this.$message({
            message: result.message,
            type: 'error',
            duration: 2000
          })
          this.$refs.loginRefs.resetFields()
        }
      })
    }
  },
  computed: {
    ...mapState({
      errors: (state) => state.user.userInfo.errors
    })
  }
}
</script>

<style lang="less" scoped>
.auth-page {
  width: 100%;
  height: 100vh;
  position: relative;
  background-image: url('../../assets/image/login_bg.jpg');
  top: 0px;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  padding-top: 100px;
}
h1,
p {
  text-align: center;
}

p a {
  color: #5cb85c;
}

p a:hover {
  color: rgb(57, 248, 57);
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
