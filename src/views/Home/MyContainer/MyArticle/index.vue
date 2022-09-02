<template>
  <!-- 加v-if是解决后端返回过来数据但是页面已经渲染完毕的情况 -->
  <div v-if="articleData.author" class="article-page">
    <div class="banner">
      <div class="container">
        <h1 class="nb-binding">{{ articleData.title }}</h1>

        <div class="article-meta">
          <a class="title-img" href="#">
            <img :src="articleData.author.image" />
          </a>
          <div class="info">
            <a href="" class="author">{{ articleData.author.username }}</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn follow-btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; 关注我的人数
            <span class="counter">{{ followingCount }}</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn article-btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; 文章点赞数
            <span class="counter">({{ articleData.favoritesCount }})</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <h2 style='color: inherit; line-height: inherit; padding: 0px; margin: 1.6em 0px; font-weight: bold; border-bottom: 2px solid rgb(127, 127, 127); font-size: 1.3em;'><span style='font-size: inherit; line-height: inherit; margin: 0px; display: inline-block; font-weight: normal; background: rgb(127, 127, 127); color: rgb(255, 255, 255); padding: 3px 10px 1px; border-top-right-radius: 3px; border-top-left-radius: 3px; margin-right: 3px;'>
            {{articleData.title}}
            </span></h2>
          <p>
            <pre v-highlight>
              <code style="white-space: pre-line" class="javascript">
                {{ articleData.body }}
              </code>
            </pre>
          </p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a class="title-img" href="profile.html"
            ><img :src="articleData.author.image"
          /></a>
          <div class="info">
            <a href="" class="author">{{ articleData.author.username }}</a>
            <span class="date">{{ articleData.createdAt | timer }}</span>
          </div>

          <button class="btn follow-btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons
          </button>
          &nbsp;
          <button class="btn article-btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ articleData.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <Comment />
    </div>
  </div>
</template>

<script>
import { reqArticle } from '@/api/axios'
import Comment from '@/components/Comment'
export default {
  name: 'MyArticle',
  components: { Comment },
  data() {
    return {
      articleData: {}
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      const result = await reqArticle(this.$route.params.id)
      console.log(result)
      if (result.status === 200) {
        this.articleData = result.data.articleData
      }
    }
  },
  computed: {
    followingCount() {
      return this.articleData.author.following.length
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 30px;
  .banner {
    padding: 2rem 0 2rem 0;
    background-color: #333;
    margin-bottom: 50px;
    h1 {
      color: white;
      letter-spacing: 5px;
      margin-bottom: 20px;
    }
    .article-meta {
      .title-img {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: red;
        float: left;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        float: left;
        margin-right: 50px;
        a {
          display: block;
          color: white;
          font-size: 13px;
          font-weight: 500 !important;
        }
        span {
          color: #bbb;
          font-size: 12px;
        }
      }
      .follow-btn {
        border: 1px solid #ccc !important;
        background-color: transparent;
        color: #ccc;
      }
      .follow-btn:hover {
        color: white;
        background-color: gainsboro;
      }
      .article-btn {
        border: 1px solid #5cb85c !important;
        background-color: transparent;
        color: #5cb85c;
      }
      .article-btn:hover {
        color: white;
        background-color: #5cb85c;
      }
    }
  }

  .article-content {
    // border-bottom: 1px solid #ccc;
    p {
      font-family: 'Source Serif Pro', serif;
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 600px;
    }
  }
  .article-actions {
    .article-meta {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      .title-img {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: red;
        float: left;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        float: left;
        margin-right: 50px;
        a {
          display: block;
          color: #5cb85c;
          font-size: 13px;
          font-weight: 500 !important;
        }
        span {
          color: #bbb;
          font-size: 12px;
        }
      }
      .follow-btn {
        border: 1px solid #ccc !important;
        background-color: transparent;
        color: #ccc;
      }
      .follow-btn:hover {
        color: white;
        background-color: gainsboro;
      }
      .article-btn {
        border: 1px solid #5cb85c !important;
        background-color: transparent;
        color: #5cb85c;
      }
      .article-btn:hover {
        color: white;
        background-color: #5cb85c;
      }
    }
  }
}
</style>
