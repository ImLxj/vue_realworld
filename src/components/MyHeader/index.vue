<template>
  <div class="container">
    <a class="navbar-brand header-title">文章博客</a>
    <ul class="nav navbar-nav pull-xs-right header-right">
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
          @click="createArticle('profile', 3)"
        >
          <i class="ion-gear-a"></i>&nbsp;我的资料
        </a>
      </li>
      <template v-if="isLogin">
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
    </ul>
    <!-- 提示弹框 -->
    <template>
      <div v-for="(count, index) in countClick" :key="index + 'header'">
        <Bounced v-show="isBounced" :message="message" />
      </div>
    </template>
  </div>
</template>

<script>
import Bounced from '@/components/Bounced'
export default {
  name: 'Header',
  components: { Bounced },
  data() {
    return {
      isLogin: true,
      isBounced: false,
      message: '请登录',
      countClick: 0,
      isIndex: 1
    }
  },
  methods: {
    createArticle(str) {
      // 点击创建文章
      if (str === 'article') {
        if (
          !window.sessionStorage.getItem('token') ||
          !this.$store.state.user.userInfo._id
        ) {
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
      if (str === 'profile') {
        if (
          !window.sessionStorage.getItem('token') ||
          !this.$store.state.user.userInfo._id
        ) {
          this.isBounced = true
          this.message = '请登录'
          this.countClick += 1
          return
        }
        this.isBounced = false
        this.countClick = 0
        this.isIndex = 3
        this.$router.push({
          name: 'myprofile'
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
        this.$router.push('/home/login')
      }
      // 点击注册
      if (str === 'register') {
        this.isIndex = 5
        this.$router.push('/home/register')
      }
    }
  }
}
</script>

<style lang="less" scoped>
a {
  color: gray;
}
.active {
  color: #000;
}
.header-title {
  float: left;
  font-weight: bold;
  font-size: 24px;
  color: #5cb85c;
}

.header-right {
  float: right;
}
.navbar {
  margin-bottom: none !important;
}
</style>
