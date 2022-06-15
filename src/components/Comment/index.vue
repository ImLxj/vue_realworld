<template>
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
          <button class="btn btn-sm btn-primary" @click.prevent="addComment">
            评论
          </button>
        </div>
        <div class="clear"></div>
      </form>

      <div
        v-for="item in commentList"
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
            <img :src="item.author[2]" class="comment-author-img" />
          </a>
          &nbsp;
          <a href="" class="comment-author">{{ item.author[1] }}</a>
          <span class="date-posted">{{ item.createdAt | timer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCurrentArticle, reqComments } from '@/api/axios'
export default {
  name: 'Comment',
  data() {
    return {
      commentCenter: '',
      commentList: []
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    async addComment() {
      const result = await reqCurrentArticle({
        id: this.$route.params.id,
        comment: this.commentCenter,
        author: {
          username: this.$store.state.user.userInfo.username
        }
      })
      this.commentCenter = ''
      if (result.status === 201) {
        this.getComment()
      }
    },
    async getComment() {
      const res = await reqComments(this.$route.params.id)
      if (res.status === 200) {
        this.commentList = res.data.comments
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
