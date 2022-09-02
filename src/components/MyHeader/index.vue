<template>
  <div class="container" style="height: 50px">
    <div class="row" style="height: 100%">
      <router-link
        class="navbar-brand header-title col-lg-4 col-md-4 col-xs-4"
        to="/home/container"
        >文章博客</router-link
      >
      <nav class="col-lg-8 col-md-8 col-xs-8">
        <ul class="pull-xs-right header-right">
          <li
            class="nav-item"
            v-for="(item, index) in routerList"
            :key="index"
            @click="changePath(item.path, index)"
          >
            <a :class="tabIndex === index ? 'active' : ''">{{ item.title }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqUserInfo } from '@/api/axios'
import { removeItem } from '@/utils/storage'
export default {
  name: 'Header',
  data() {
    return {
      isIndex: 1,
      isUsername: false,
      tabIndex: 0,
      routerList: [
        {
          title: '主页',
          path: '/home/container',
          isToken: false
        },
        {
          title: '创建文章',
          path: '/home/createArticle',
          isToken: true
        },
        {
          title: '修改信息',
          path: '/home/setting',
          isToken: true
        },
        {
          title: '登录',
          path: '/login',
          isToken: false
        },
        {
          title: '注册',
          path: '/register',
          isToken: false
        }
      ]
    }
  },
  methods: {
    // 看看当前用户是否登录成功
    // 查看当前登录用户的个人信息
    async handle(title) {
      if (title === this.userInfo.username) {
        const res = await reqUserInfo()
        if (!res) {
          this.$message({})
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
            author: this.userInfo,
            pageSize: 3,
            pageNum: 1
          },
          query: {
            t: Date.now()
          }
        })
      } else if (title === '退出') {
        removeItem() // 清除所有本地存储
        this.$store.commit('GETUSERLOGIN', {}) // 清除仓库里面个人信息
        this.$store.commit('SETTOKEN', '') // 清除仓库token
      }
    },
    goPath(path, validation) {
      if (this.$route.path === null) {
        this.$route.push('/')
      }
      if (this.$route.path === path) return
      if (validation) {
        if (!window.localStorage.getItem('token')) {
          this.isBounced = true
          this.message = '请登录'
          this.countClick += 1
          return
        }
        this.isBounced = false
        this.countClick = 0
        this.isIndex = 3
        this.$router.push(path)
      } else {
        this.$router.push(path)
      }
    },
    changePath(path, index) {
      this.tabIndex = index
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo
    })
  },
  watch: {
    // 监听仓库里面有没有用户信息，如果有用户信息就讲导航栏的登录和注册变成 当前用户姓名和退出
    userInfo() {
      if (window.localStorage.getItem('token')) {
        this.routerList.splice(
          3,
          2,
          {
            title: this.userInfo.username,
            path: '/home/information',
            isToken: true
          },
          { title: '退出', path: null, isToken: false }
        )
      } else {
        this.routerList.splice(
          3,
          2,
          {
            title: '登录',
            path: '/home/login',
            isToken: false
          },
          {
            title: '注册',
            path: '/home/register',
            isToken: false
          }
        )
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
  font-weight: 700;
  font-size: 15px;
  align-content: center;
}
.header-title {
  float: left;
  font-weight: bold;
  font-size: 24px;
  color: #5cb85c;
  // color: transparent;
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
