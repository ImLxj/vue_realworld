<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" @click="myArticle">
        <a class="nav-link disabled" ref="myArticle" href="#">我发布的文章</a>
      </li>
      <li class="nav-item" @click="allArticle">
        <a class="nav-link" href="#" ref="allArticle">全部文章</a>
      </li>
    </ul>
    <div class="nprogress">
      <div :class="['nprogress-center', animation]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      animation: 'allArticle'
    }
  },
  mounted() {
    this.$refs.allArticle.style.color = '#5cb85c'
  },
  // tabs 颜色切换
  methods: {
    myArticle(e) {
      this.animation = 'myArticle'
      e.target.style.color = '#5cb85c'
      this.$refs.allArticle.style.color = ''
    },
    allArticle(e) {
      this.animation = 'allArticle'
      e.target.style.color = '#5cb85c'
      this.$refs.myArticle.style.color = ''
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
      left: 114px;
      transition: all 0.5s;
    }
    .myArticle {
      width: 114px;
      left: 0px;
      transition: all 0.5s;
    }
  }
}
</style>
