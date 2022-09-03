<template>
  <div class="container" style="height: 50px">
    <div class="mask" :class="opacityUl ? 'show' : 'hide'"></div>
    <div class="row" style="height: 100%">
      <router-link
        class="navbar-brand header-title col-lg-4 col-md-4 col-xs-4"
        to="/home/container"
        >文章博客</router-link
      >
      <nav class="col-lg-8 col-md-8 col-xs-8">
        <button
          class="tabNav"
          :class="tabShow ? 'hide' : 'show'"
          @click="changeTab"
        >
          <i class="el-icon-s-fold"></i>
        </button>
        <template v-if="tabShow">
          <ul class="pull-xs-right navbar-nav maxUl">
            <li
              class="nav-item header-left"
              v-for="(item, index) in routerList"
              :key="index"
              @click="changePath(item, index)"
            >
              <a :class="tabIndex === index ? 'active' : ''">{{
                item.title
              }}</a>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="showUl" :class="opacityUl ? 'show' : 'hide'">
            <ul class="pull-xs-right navbar-nav minUl">
              <li
                class="nav-item header-left"
                v-for="(item, index) in routerList"
                :key="index"
                @click="changePath(item, index)"
              >
                <a>{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeItem, getItem } from '@/utils/storage'
export default {
  name: 'Header',
  data() {
    return {
      isIndex: 1,
      isUsername: false,
      tabIndex: 0,
      tabShow: true,
      opacityUl: false,
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
  mounted() {
    if (this.screenWidth <= 680) {
      this.tabShow = false
    } else {
      this.tabShow = true
    }
  },
  methods: {
    // 看看当前用户是否登录成功
    // 查看当前登录用户的个人信息
    async changePath(item, index) {
      this.tabIndex = index
      if (item.isToken) {
        if (!getItem('token') || !getItem('username')) {
          this.$message({
            message: '您还没有登录请登录！',
            type: 'error',
            duration: 500
          })
          this.tabIndex = 0
        } else {
          switch (item.path) {
            case '/home/information':
              this.$router.push({
                name: 'information',
                params: {
                  _id: getItem('_id'),
                  username: getItem('username')
                }
              })
              break
            default:
              this.$router.push(item.path)
              break
          }
        }
      } else {
        if (item.path === 'out') {
          removeItem()
          this.$router.push('/login')
          return
        }
        this.$router.push(item.path)
      }
    },
    // 变成折叠导航栏
    changeTab() {
      this.opacityUl = !this.opacityUl
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      screenWidth: (state) => state.screen.screenWidth
    })
  },
  watch: {
    userInfo: {
      immediate: true,
      deep: true,
      handler() {
        if (window.localStorage.getItem('token')) {
          this.routerList.splice(
            3,
            2,
            {
              title: this.userInfo.username,
              path: '/home/information',
              isToken: true
            },
            { title: '退出', path: 'out', isToken: false }
          )
        } else {
          this.routerList.splice(
            3,
            2,
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
          )
        }
      }
    },
    screenWidth() {
      if (this.screenWidth < 650) {
        this.tabShow = false
      } else {
        this.tabShow = true
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
}
.header-title {
  float: left;
  font-weight: bold;
  font-size: 24px;
  color: #5cb85c;
  // color: transparent;
  transition: all 0.5s linear;
}

.hide {
  display: none;
}
.show {
  display: block;
}

nav {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  position: relative;
  .tabNav {
    font-size: 30px;
    background: transparent;
    border: none;
  }
  .maxUl {
    margin: 0;
    list-style: none;

    .header-left {
      float: left;
      margin-left: 15px;
      a {
        text-decoration: none;
      }
    }
  }
  .showUl {
    .minUl {
      width: 200px;
      height: 100vh;
      list-style: none;
      position: absolute;
      top: 50px;
      display: flex;
      flex-direction: column;
      text-align: right;
      background-color: white;
      padding: 0 10px 0 0;
      z-index: 10000;
      margin-top: 0px;
      right: 0px;
      animation: leftAnimate 0.5s linear forwards;
      li {
        margin: 10px 0 0 0;
        padding: 8px 10px 8px 0;
        border-bottom: 1px lightgray dashed;
        a {
          color: gray;
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
    @keyframes leftAnimate {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0%);
      }
    }
  }
}

.username {
  width: 50px;
  height: 50px;
}
.mask {
  width: 100vh;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  position: absolute;
  top: 50px;
  left: -5px;
}
// // 媒体查询
@media (max-width: 680px) {
  .header-title {
    font-size: 20px;
    transition: all 0.5s linear;
  }
}
@media (max-width: 350px) {
  .header-title {
    font-size: 15px;
    transition: all 0.5s linear;
  }
}
</style>
