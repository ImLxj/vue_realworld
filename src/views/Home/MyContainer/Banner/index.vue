<template>
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">我的博客</h1>
      <p>一个分享知识的地方</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.banner {
  background: #5cb85c;
  padding: 30px 0 30px 0;
  box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.3),
    inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3);
  letter-spacing: 13px;
  margin-bottom: 30px;

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
</style>
