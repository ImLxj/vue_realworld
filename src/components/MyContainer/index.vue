<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">我的博客</h1>
        <p>一个分享知识的地方</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Tabs />
          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"><img src="" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html"><img src="" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from './Tabs'
export default {
  name: 'Container',
  components: { Tabs }
}
</script>

<style lang="less" scoped>
.home-page {
  .banner {
    background: #5cb85c;
    padding: 20px 0 20px 0;
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
      inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
    letter-spacing: 13px;
    margin-bottom: 20px;

    h1 {
      color: white;
    }
    p {
      color: #fff;
      text-align: center;
      line-height: 2.5rem;
      font-size: 1.5rem;
      font-weight: 300 !important;
      margin-bottom: 0px;
    }
    h1 {
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
      font-weight: 700 !important;
      text-align: center;
      font-size: 3.5rem;
      padding-bottom: 0.5rem;
    }
  }

  .sidebar {
    padding: 5px 10px 10px 10px;
    background: #f3f3f3;
    border-radius: 4px;

    p {
      margin-bottom: 0.2rem;
    }
  }
}
</style>
