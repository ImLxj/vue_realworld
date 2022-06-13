<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row setting-center">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">修改信息</h1>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="file" ref="imageRef" placeholder="头像的路径" />
                <!-- <img class="img-circle" src="../../../assets/logo.png" alt="" /> -->
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text form-control-lg"
                  type="text"
                  placeholder="用户名"
                  ref="usernameRef"
                  v-model="userInfo.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  ref="bioRef"
                  placeholder="简短的个人简介"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text form-control-lg"
                  type="text"
                  ref="emailRef"
                  placeholder="邮箱"
                  v-model="userInfo.email"
                  @blur="rulesEmail"
                />
                <span class="validator" v-show="emValidator"
                  >邮箱格式不正确</span
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-text form-control-lg"
                  type="password"
                  placeholder="密码"
                  ref="passwordRef"
                  @blur="rulesPassword"
                  autocomplete
                />
              </fieldset>
              <button
                @click.prevent="uploadInfo"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                确定修改
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rulesEmail, rulesPassword } from '@/views/Home/rules'
export default {
  name: 'Setting',
  data() {
    return {
      emValidator: false,
      pawValidator: false
    }
  },
  methods: {
    uploadInfo() {
      const files = this.$refs.imageRef.files[0]
      let imgUrl = ''
      const _this = this
      if (files) {
        const reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onload = function () {
          imgUrl = this.result
          const userInfo = {
            username: _this.userInfo.username,
            bio: _this.userInfo.bio,
            email: _this.userInfo.email,
            image: imgUrl
          }
          _this.$store.dispatch('updateUserInfo', userInfo)
        }
      }
    },
    rulesEmail() {
      // this.emValidator = rulesEmail(this.$refs.emailRef.value)
    },
    rulesPassword() {
      // this.pawValidator = rulesPassword(this.$refs.passwordRef.value)
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  }
}
</script>

<style lang="less" scoped>
// 我的信息设置
.settings-page {
  .page {
    margin-bottom: 20px;

    .setting-center {
      display: flex;
      justify-content: center;
      align-items: center;

      h1 {
        color: #5cb85c;
        text-align: center;
        padding: 5px 0 5px 0;
        margin-bottom: 17px;
      }

      .form-control {
        outline: none;
        box-shadow: none;
      }

      .form-text {
        height: 50px;
      }

      textarea {
        resize: none; // 禁止拖拽大小
      }

      .btn {
        float: right;
        background-color: #5cb85c;
        border: none;
        outline: none;
      }

      .btn:hover {
        background-color: green;
      }

      .btn::after {
        clear: both;
      }
    }
  }
}
.validator {
  color: red;
  font-size: 12px;
  position: absolute;
  font-weight: 100;
  margin-left: 3px;
}
</style>
