<template>
  <div class="container">
    <a class="navbar-brand header-title">文章博客</a>
    <ul class="nav navbar-nav pull-xs-right header-right">
      <li class="nav-item">
        <router-link class="nav-link" active-class="active" to="/home/container"
          >主页</router-link
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          active-class="active"
          @click="createArticle('article')"
        >
          <i class="ion-compose"></i>&nbsp;创建文章
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          active-class="active"
          @click="createArticle('profile')"
        >
          <i class="ion-gear-a"></i>&nbsp;我的资料
        </a>
      </li>
      <template v-if="isLogin">
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" to="/home/login"
            >登录</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            to="/home/register"
            >注册</router-link
          >
        </li>
      </template>
    </ul>
    <!-- 提示弹框 -->
    <!-- <Bounced v-show="isBounced" /> -->
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    createArticle(str) {
      if (str === 'article') {
        this.$router.push({
          name: 'createarticle'
        })
      }
      if (str === 'profile') {
        this.$router.push({
          name: 'myprofile'
        })
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
