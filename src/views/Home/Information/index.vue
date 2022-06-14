<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userInfo.image" class="user-img" />
            <h4>{{ userInfo.username }}</h4>
            <p>{{ userInfo.bio }}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow Eric Simons
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <Article text1="我的文章" text2="我喜欢的文章" />
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
    // this.$store.dispatch('otherUserInfo')
    this.$store.dispatch('getArticleList', { author: this.userInfo.username })
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
      articleList: (state) => state.article.articleList
    })
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
