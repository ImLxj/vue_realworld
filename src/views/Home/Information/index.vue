<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profilesInfo.image" class="user-img" />
            <h4>{{ profilesInfo.username }}</h4>
            <button
              v-if="isFollowing"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click.prevent="following"
            >
              &nbsp; 关注
            </button>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn active"
              @click.prevent="following"
            >
              &nbsp; 取消关注
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <Article text1="我的文章" text3="我喜欢的文章" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Article from '@/components/Article'
import { reqProfiles } from '@/api/axios'
export default {
  name: 'Information',
  components: { Article },
  data() {
    return {
      isFollowing: true,
      profilesInfo: {}
    }
  },
  mounted() {
    this.getArticleList()
    this.profiles()
  },
  methods: {
    getArticleList() {
      this.$store.dispatch('getArticleList', {
        author: this.$route.params.author.username
      })
    },
    following() {
      this.isFollowing = !this.isFollowing
    },
    // 获取个人资料
    async profiles() {
      const profilesId = window.localStorage.getItem('_id')
      const author = this.$route.params.author
      if (!author.username) {
        const res = await reqProfiles(profilesId)
        if (res.status === 200) {
          this.profilesInfo = res.data.profile
        }
        return false
      }
      this.profilesInfo = author
    }
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList
    })
  },
  // 现在这个时候路由里面的params参数还是之前的
  beforeRouteUpdate(to, from, next) {
    // 如果不加nextTick的话，点击第一下跳转当前路由这时的username还是之前的没有发生改变然后请求就发送出去了，加上nextTick的作用就是等username改变之后在发送请求
    this.$nextTick(function () {
      if (!to.params.author.username) {
        this.profiles()
        return
      }
      this.profilesInfo = to.params.author
    })
    next()
  }
}
</script>

<style lang="less" scoped>
.profile-page {
  .user-info {
    text-align: center;
    background: #f3f3f3;
    padding: 2rem 0 1rem 0;
    .user-img {
      width: 100px;
      height: 100px;
      border-radius: 100px;
      margin-bottom: 1rem;
    }
    h4 {
      font-weight: 700;
    }
    .action-btn {
      float: right;
      color: #999;
      background: #ffffff;
      border: 1px solid #999;
    }
    .action-btn:hover {
      color: #ffffff;
      background: #999;
    }
    .active {
      color: #ffffff;
      background: #999;
    }
  }
  .container {
    margin-top: 15px;
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-left: -15px;
      margin-right: -15px;
    }
  }
}
</style>
