<template>
  <div class="container">
    <a class="navbar-brand header-title">文章博客</a>
   <!--  <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapsibleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button> -->
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
          <i class="ion-gear-a"></i>&nbsp;修改信息
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
          <a @click.prevent="goInformation" class="user-img" href="#">
            <img :src="userInfo.image" alt="" />
          </a>
        </li>
        <li class="nav-item">
          <a @click.prevent="exit" href="#">
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
export default {
  name: 'Header',
  components: { Bounced },
  data() {
    return {
      isBounced: false,
      message: '请登录',
      countClick: 0,
      isIndex: 1,
      type: 'alert-danger'
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
      if (str === 'setting') {
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
    // 查看当前登录用户的个人信息
    goInformation() {
      this.$router.push({
        name: 'information',
        params: {
          _id: this.userInfo._id
        }
      })
    },
    // 退出当前用户
    exit() {
      // 刷新当前网站
      window.location.reload()
      window.sessionStorage.clear()
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
}
.header-title {
  float: left;
  font-weight: bold;
  font-size: 24px;
  color: #5cb85c;
}

.user-img {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.header-right {
  float: right;
}

.navbar {
  margin-bottom: none !important;
}
</style>
