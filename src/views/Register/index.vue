<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div
          class="col-md-8 col-md-offset-2 col-lg-offset-3 col-lg-6 col-xs-10 col-xs-offset-1"
        >
          <h1 class="text-xs-center title" style="color: white; font-weight: bold">注册</h1>
          <p class="text-xs-center">
            <router-link to="/login">已有账号,前往登录!</router-link>
          </p>
          <el-form
            :model="registerUser"
            :rules="registerUserRules"
            ref="registerUserRefs"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="registerUser.username"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="registerUser.email"
                placeholder="请输入邮箱"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registerUser.password"
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
import { reqGetRegister } from '@/api/axios'
export default {
  name: 'Register',
  data() {
    return {
      registerUser: {
        email: '',
        password: '',
        username: ''
      },
      registerUserRules: {
        username: [
          {
            required: true,
            message: '请输入正确的用户名',
            trigger: 'blur'
          },
          {
            min: 4,
            max: 16,
            message: '长度在 4 到 16 个字符',
            trigger: 'blur'
          }
        ],
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
    getRegister() {
      this.$refs.registerUserRefs.validate(async (valid) => {
        if (valid) {
          const result = await reqGetRegister(this.registerUser)
          console.log(result)
        }
      })
    }
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
</style>
