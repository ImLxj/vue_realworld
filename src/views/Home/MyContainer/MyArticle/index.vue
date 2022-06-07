<template>
  <!-- 加v-if是解决后端返回过来数据但是页面已经渲染完毕的情况 -->
  <div v-if="article.author" class="article-page">
    <div class="banner">
      <div class="container">
        <h1 class="nb-binding">{{ article.title }}</h1>

        <div class="article-meta">
          <a class="title-img" href="#">
            <img :src="article.author.image" />
          </a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">January 20th</span>
          </div>
          <button class="btn follow-btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; 关注我的人数 <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn article-btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; 文章点赞数
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <h2 id="introducing-ionic">{{ article.title }}</h2>
          <p>{{ article.body }}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a class="title-img" href="profile.html"
            ><img :src="article.author.image"
          /></a>
          <div class="info">
            <a href="" class="author">{{ article.author.username }}</a>
            <span class="date">{{ article.createdAt | timer }}</span>
          </div>

          <button class="btn follow-btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons
          </button>
          &nbsp;
          <button class="btn article-btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post
            <span class="counter">({{ article.favoritesCount }})</span>
          </button>
        </div>
      </div>

      <div class="row comment">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="commentCenter"
              ></textarea>
            </div>
            <div class="card-footer">
              <button
                class="btn btn-sm btn-primary"
                @click.prevent="getComment"
              >
                评论
              </button>
            </div>
            <div class="clear"></div>
          </form>

          <div
            v-for="item in article.comments"
            :key="item._id"
            class="card comment-card"
          >
            <div class="card-block">
              <p class="card-text">
                {{ item.body }}
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img :src="item.userInfo[2]" class="comment-author-img" />
              </a>
              &nbsp;
              <a href="" class="comment-author">{{ item.userInfo[1] }}</a>
              <span class="date-posted">{{ item.createdAt | timer }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyArticle',
  data() {
    return {
      commentCenter: ''
    }
  },
  created() {
    this.$store.dispatch('getComment', {
      id: this.$route.params.id,
      comment: this.commentCenter,
      userInfo: this.$store.state.user.userInfo
    })
  },
  methods: {
    getComment() {
      this.$store.dispatch('getComment', {
        id: this.$route.params.id,
        comment: this.commentCenter,
        userInfo: this.$store.state.user.userInfo
      })
      this.commentCenter = ''
    }
  },
  computed: {
    ...mapState({
      article: (state) => state.article.articleInfo
    })
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
  .comment {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    .comment-form {
      margin-bottom: 15px;
      textarea {
        resize: none;
        outline: none;
        box-shadow: none;
        margin-bottom: 15px;
      }
      .card-footer {
        text-align: right;
        button {
          background-color: #5cb85c;
          color: honeydew;
          border: none;
          outline: none;
          font-weight: bold;
        }
      }
    }

    .comment-card {
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      .card-block {
        padding: 25px;
      }
      .card-footer {
        background-color: #f5f5f5;
        padding: 5px 0 5px 15px;
      }
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: inline-block;
      }
      a {
        color: green;
        font-weight: 100px;
        margin-right: 10px;
        font-size: 12px;
      }
      span {
        color: #ccc;
        font-weight: 100px;
        font-size: 12px;
      }
    }
  }
}
</style>
