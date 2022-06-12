<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list">
      <a href="#" class="" v-for="(tag, index) in tagList" :key="index">{{
        tag
      }}</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Tags',
  computed: {
    ...mapGetters(['tagList'])
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  padding: 5px 10px 10px 10px;
  background: #f3f3f3;
  border-radius: 4px;
  p {
    margin-bottom: 20px;
  }
  .tag-list {
    width: 100%;
    padding: 2px;

    a {
      border-radius: 50px;
      background: #818a91;
      padding: 8px;
      color: white;
      font-size: 12px;
      font-weight: 300;
      // float: left;
      margin: 0px 8px 8px 0px;
      display: inline-block;
    }
    a:hover {
      background: gray;
      text-decoration: none;
    }
  }
}
</style>
