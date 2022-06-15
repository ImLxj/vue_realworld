<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{ username }}</h4>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <!-- <i class="ion-plus-round"></i> -->
              &nbsp; Follow Eric Simons
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
export default {
  name: 'Information',
  components: { Article },
  mounted() {
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      this.$store.dispatch('getArticleList', {
        author: this.$route.params.author.username
      })
    }
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList
    }),
    username() {
      return this.$route.params.author.username
    },
    image() {
      return this.$route.params.author.image
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to.params)
    next()
  },
  // 现在这个时候路由里面的params参数还是之前的
  beforeRouteUpdate(to, from, next) {
    // 如果不加nextTick的话，点击第一下跳转当前路由这时的username还是之前的没有发生改变然后请求就发送出去了，加上nextTick的作用就是等username改变之后在发送请求
    this.$nextTick(function () {
      this.$store.dispatch('getArticleList', {
        author: this.$route.params.author.username
      })
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
