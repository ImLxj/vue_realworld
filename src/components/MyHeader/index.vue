<template>
  <div class="container">
    <router-link class="navbar-brand header-title" to="/home/container"
      >文章博客</router-link
    >
    <ul
      class="nav navbar-nav collapse navbar-collapse pull-xs-right header-right"
    >
      <li class="nav-item">
        <a
          :class="{ ['nav-link']: true, active: isIndex === 1 }"
          @click="createArticle('container', 1)"
          >主页</a
        >
      </li>
      <li class="nav-item">
        <a
          :class="{ ['nav-link']: true, active: isIndex === 2 }"
          @click="createArticle('article', 2)"
        >
          <i class="ion-compose"></i>&nbsp;创建文章
        </a>
      </li>
      <li class="nav-item">
        <a
          :class="{ ['nav-link']: true, active: isIndex === 3 }"
          @click="createArticle('setting', 3)"
        >
          <i class="glyphicon glyphicon-pencil"></i>&nbsp;修改信息
        </a>
      </li>
      <template v-if="!userInfo.username">
        <li class="nav-item">
          <a
            :class="{ ['nav-link']: true, active: isIndex === 4 }"
            @click="createArticle('login', 4)"
            >登录</a
          >
        </li>
        <li class="nav-item">
          <a
            :class="{ ['nav-link']: true, active: isIndex === 5 }"
            @click="createArticle('register', 4)"
            >注册</a
          >
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <a @click.prevent="goInformation" class="username" href="#">
            <span>{{ userInfo.username }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="exit" class="exit" href="#">
            <span>退出</span>
          </a>
        </li>
      </template>
    </ul>
    <!-- 提示弹框 -->
    <template>
      <div v-for="(count, index) in countClick" :key="index + 'header'">
        <Bounced v-show="isBounced" :message="message" :type="type" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Bounced from '@/components/Bounced'
import { reqUserInfo } from '@/api/axios'
import { removeItem } from '@/utils/storage'
export default {
  name: 'Header',
  components: { Bounced },
  data() {
    return {
      isBounced: false,
      message: '请登录',
      countClick: 0,
      isIndex: 1,
      type: 'alert-danger',
      isUsername: false
    }
  },
  methods: {
    createArticle(str) {
      // 点击创建文章
      if (str === 'article') {
        if (!window.localStorage.getItem('token')) {
          this.isBounced = true
          this.message = '请登录'
          this.countClick += 1
          return
        }
        this.isBounced = false
        this.countClick = 0
        this.isIndex = 2
        this.$router.push({
          name: 'createarticle'
        })
      }
      // 点击我的资料
      if (str === 'setting') {
        if (!window.localStorage.getItem('token')) {
          this.isBounced = true
          this.message = '请登录'
          this.countClick += 1
          return
        }
        this.isBounced = false
        this.countClick = 0
        this.isIndex = 3
        this.$router.push({
          name: 'setting'
        })
      }
      // 点击主页
      if (str === 'container') {
        this.isIndex = 1
        this.$router.push('/home/container')
      }
      // 点击登录
      if (str === 'login') {
        this.isIndex = 4
        this.isBounced = false
        this.$router.push('/home/login')
      }
      // 点击注册
      if (str === 'register') {
        this.isIndex = 5
        this.isBounced = false
        this.$router.push('/home/register')
      }
    },
    // 看看当前用户是否登录成功
    // 查看当前登录用户的个人信息
    async goInformation() {
      const res = await reqUserInfo()
      if (!res) {
        this.isBounced = true
        this.message = '请重新登录'
        this.countClick += 1
        return
      }
      if (res.status === 401) {
        this.isBounced = true
        this.message = '请重新登录'
        this.countClick += 1
        return
      }
      this.$router.push({
        name: 'information',
        params: {
          author: this.userInfo
        },
        query: {
          t: Date.now()
        }
      })
    },
    // 退出当前用户
    exit() {
      removeItem() // 清除所有本地存储
      this.$store.commit('GETUSERLOGIN', {}) // 清除仓库里面个人信息
      this.$store.commit('SETTOKEN', '') // 清除仓库token
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
a {
  color: gray;
}
.active {
  color: #000;
  font-weight: 500;
}
.header-title {
  float: left;
  font-weight: bold;
  font-size: 24px;
  color: #5cb85c;
}

.username {
  width: 50px;
  height: 50px;
}

.header-right {
  float: right;
}

.navbar {
  margin-bottom: none !important;
}
</style>
