<template>
  <div>
    <div class="feed-toggle">
      <ul class="nav nav-pills outline-active">
        <!-- 我的文章 -->
        <li v-if="text1" class="nav-item" @click="myArticle">
          <a class="nav-link disabled" ref="myArticle">{{ text1 }}</a>
        </li>
        <!-- 全部文章 -->
        <li v-if="text2" class="nav-item" @click="allArticle">
          <a class="nav-link" ref="allArticle">{{ text2 }}</a>
        </li>
        <!-- 我喜欢的文章 -->
        <li v-if="text3" class="nav-item" @click="loveArticle">
          <a class="nav-link" ref="loveArticle">{{ text3 }}</a>
        </li>
      </ul>
      <div class="nprogress">
        <div :class="['nprogress-center', animation]"></div>
      </div>
    </div>
    <div
      class="article-preview"
      v-for="(item, index) in articleList"
      :key="index"
    >
      <div class="article-meta">
        <a @click.prevent="goInformation(item.author)" class="head-img" href="#"
          ><img :src="item.author.image"
        /></a>
        <div class="info">
          <a @click.prevent="goInformation(item.author)" class="author">{{
            item.author.username
          }}</a>
          <span class="date">{{ item.createdAt | timer }}</span>
        </div>
        <button
          :class="[
            'btn',
            'btn-outline-primary',
            'btn-sm',
            'pull-xs-right',
            { btnActive: favorite(item) }
          ]"
          @click="sumFavorites(item)"
        >
          <i class="glyphicon glyphicon-heart-empty active"></i>
          {{ item.favoritesCount }}
        </button>
      </div>
      <div class="clear"></div>
      <a href="#" class="preview-link" @click.prevent="sendArticle(item)">
        <h1>{{ item.title }}</h1>
        <p>{{ item.body }}</p>
        <div class="bottom">
          <span>Read more...</span>
          <template v-for="(tag, index) in item.tagList">
            <span
              class="tagList"
              v-if="!item.tagList[0] == ''"
              :key="index + 'tag'"
              >{{ tag }}</span
            >
          </template>
        </div>
      </a>
    </div>
    <!-- 分页器 -->
    <Pagination
      :pageNum="pageNum"
      :pageSize="pageSize"
      :total="articlesCount"
      :continues="5"
      @getPageNum="getPageNum"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqFavorite, reqUnFavorite } from '@/api/axios'
import Pagination from '@/components/Pagination'
import { getItem } from '@/utils/storage'
export default {
  name: 'Article',
  components: { Pagination },
  props: {
    text1: String,
    text2: String,
    text3: String,
    username: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      animation: 'allArticle',
      pageNum: 1, // 当前页数
      pageSize: 3 // 一页显示几条
    }
  },
  mounted() {
    this.initArticles()
  },
  // tabs 颜色切换
  methods: {
    // 初始化文章显示
    /*
      文章显示有两种情况：
        - 在主页的时候，刚开始显示所有文章
        - 就是跳转到用户页面的时候，显示当前用户发布的所有文章,
          当跳转到当前用户页面的时候，需要看是否时当前登录用户，需要根据组件传递的参数来和localStorage里面的username字段的值想不想同
          不相同则表示不是当前登录用户，使用路由传递过来的值，如果相同就使用localStorage的username值
    */
    initArticles() {
      // 当在主页的时候
      if (this.$route.path === '/home/container') {
        this.$refs.allArticle.style.color = '#5cb85c'
        this.animation = 'allArticle'
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        })
      } else if (this.$route.path === '/home/information') {
        this.$refs.myArticle.style.color = '#5cb85c'
        this.animation = 'myArticle'
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize,
          author: this.username
        })
      }
    },
    // 跳转到用户信息页面
    goInformation(author) {
      if (!getItem('token') && !getItem('_id')) {
        this.$message({
          message: '请登录',
          type: 'error'
        })
        return
      }
      this.$router.push({
        name: 'information',
        params: {
          _id: author._id,
          image: author.image,
          username: author.username
        },
        query: '/t' + new Date().getTime()
      })
    },
    myArticle(e) {
      if (!getItem('token') && !getItem('_id')) {
        this.$message({
          message: '请登录',
          type: 'error'
        })
        return
      }
      this.animation = 'myArticle'
      e.target.style.color = '#5cb85c'
      // 查看我的文章在主页，这个时候肯定是当前登录用户发布的文章
      if (this.$route.path === '/home/container') {
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize,
          author: getItem('username')
        })
        this.$refs.allArticle.style.color = ''
      } else if (this.$route.path === '/home/information') {
        // 这个时候肯定是去用户主页这分页肯定是 this.query的
        this.$refs.loveArticle.style.color = ''
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize,
          author: this.username
        })
      }
      this.pageNum = 1 // 再把页数设置为
    },
    allArticle(e) {
      this.animation = 'allArticle'
      e.target.style.color = '#5cb85c'
      this.$refs.myArticle.style.color = ''
      this.pageNum = 1
      this.$store.dispatch('getArticleList', {
        limit: this.pageSize,
        offset: (this.pageNum - 1) * this.pageSize
      })
    },
    loveArticle(e) {
      this.animation = 'loveArticle'
      e.target.style.color = '#5cb85c'
      this.$refs.myArticle.style.color = ''
    },
    // 给文章点赞
    async sumFavorites(item) {
      if (!this.userInfo._id || !getItem('token')) {
        this.message = '请登录'
        this.isLogin = true
        this.clickCount += 1
        return
      }
      const isFavorite = this.favorite(item)
      if (!isFavorite) {
        const result = await reqFavorite(item)
        if (result.status === 200) {
          this.isLogin = false
        }
      } else {
        const result = await reqUnFavorite(item)
        if (result.status === 200) {
          this.isLogin = false
        }
      }
      if (this.animation === 'myArticle') {
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize,
          author: this.username
        })
      } else if (this.animation === 'allArticle') {
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        })
      }
    },
    // 跳转到文章具体内容页面
    sendArticle(articleInfo) {
      if (!this.userInfo._id || !getItem('token')) {
        this.message = '请登录'
        this.isLogin = true
        this.clickCount += 1
        return 0
      }
      this.$router.push({
        name: 'myarticle',
        params: {
          id: articleInfo._id
        }
      })
      this.isLogin = false
    },
    // 分页器
    getPageNum(page) {
      this.pageNum = page
      if (this.animation === 'allArticle') {
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        })
      } else if (this.animation === 'myArticle') {
        this.$store.dispatch('getArticleList', {
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize,
          author: getItem('username')
        })
      }
    },
    // 判断文章是是否被当前用户喜欢
    favorite(item) {
      return item.favorite.includes(getItem('_id'))
    }
  },
  computed: {
    ...mapState({
      articleList: (state) => state.article.articleList,
      userInfo: (state) => state.user.userInfo,
      articlesCount: (state) => state.article.articlesCount
    })
  },
  watch: {
    username() {
      this.initArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.feed-toggle {
  position: relative;
  margin-bottom: -1px;

  ul {
    li a {
      color: gray;
    }
    .active {
      color: #5cb85c;
    }
  }

  .nprogress {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #f3f3f3;

    .nprogress-center {
      width: 114px;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: #5cb85c;
    }
    .allArticle {
      width: 86px;
      left: 86px;
      transition: all 0.5s;
    }
    .myArticle {
      width: 86px;
      left: 0px;
      transition: all 0.5s;
    }
    .loveArticle {
      width: 114px;
      left: 86px;
      transition: all 0.5s;
    }
  }
}
.article-preview {
  padding: 20px 0 6px 0;
  border-bottom: 2px solid #f3f3f3;
  // margin-bottom: 10px;
  .article-meta {
    width: 100%;
    position: relative;
    height: 50px;
    // font-weight: 300;
    padding: 10px 5px 10px 5px;
    .head-img {
      display: block;
      float: left;
      margin-left: 2px;
      height: 40px;
      width: 40px;
    }
    .head-img img {
      height: 100%;
      width: 100%;
      border-radius: 40px;
    }
    .info {
      float: left;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      a {
        color: #5cb85c;
      }
      span {
        font-size: 12px;
        margin-top: 2px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    button {
      float: right;
      width: 60px;
      height: 28px;
      border: 1px solid #5cb85c;
      background: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      outline: none;
      i {
        color: #5cb85c;
        font-size: 15px;
      }
    }
    button:hover {
      background: #5cb85c;
      color: white;
      i {
        color: white;
      }
    }
    .btnActive {
      background: #5cb85c;
      color: white;
      i {
        color: white;
      }
    }
  }
  .clear {
    clear: both;
  }
  .preview-link {
    padding: 5px 2px 0px 5px;
    h1 {
      padding: 0px;
      margin: 0px 0 8px 0;
      font-size: 22px;
      color: #373a3c;
      font-weight: bold;
    }
    p {
      color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 20px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    span {
      margin-top: 5px;
      color: rgba(0, 0, 0, 0.4);
      font-size: 12px;
    }
    .bottom {
      height: 30px;
      line-height: 30px;
      .tagList {
        float: right;
        border: 0.5px solid rgba(0, 0, 0, 0.4);
        margin-left: 8px;
        border-radius: 5px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        padding: 0px 10px 0px 10px;
      }
    }
  }
  .preview-link:hover {
    text-decoration: none;
  }
}
</style>
