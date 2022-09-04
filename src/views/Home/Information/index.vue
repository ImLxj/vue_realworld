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
              关注
            </button>
            <button
              v-else
              class="btn btn-sm btn-outline-secondary action-btn active"
              @click.prevent="unFollowUser"
            >
              取消关注
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <Article
            :username="this.$route.params.username"
            text1="我的文章"
            text3="我喜欢的文章"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Article from '@/components/Article'
import { reqFollowing, reqUnFollowing } from '@/api/axios'
import { getItem } from '@/utils/storage'
export default {
  name: 'Information',
  components: { Article },
  data() {
    return {
      isFollowing: true, // 切换关注用户信息
      profilesInfo: {}
    }
  },
  mounted() {
    this.profilesInfo = this.$route.params
  },
  methods: {
    // 关注用户
    async following() {
      const res = await reqFollowing(getItem('_id'))
      if (res.status === 200) {
        this.isFollowing = !this.isFollowing
      }
    },
    // 取消关注用户
    async unFollowUser() {
      const res = await reqUnFollowing(getItem('_id'))
      if (res.status === 200) {
        this.isFollowing = !this.isFollowing
      }
    }
  },
  watch: {
    '$route.params.username'() {
      this.profilesInfo = this.$route.params
    }
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
      padding: 5px;
      text-align: center;
      background: #ffffff;
      border: 1px solid #999;
      outline: none !important;
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
