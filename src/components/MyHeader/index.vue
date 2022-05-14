<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand header-title">文章博客</a>
      <ul class="nav navbar-nav pull-xs-right header-right">
        <li class="nav-item">
          <a class="nav-link active" href="">主页</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-compose"></i>&nbsp;创建文章
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">
            <i class="ion-gear-a"></i>&nbsp;我的资料
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">登录</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">注册</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
a {
  color: gray;
}
a.active {
  color: #000;
}
.header-title {
  float: left;
  font-weight: bold;
  font-size: 24px;
  color: #5cb85c;
}

.header-right {
  float: right;
}
</style>
