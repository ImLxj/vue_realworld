<template>
  <div class="home-page">
    <Banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <Article />
        </div>
        <div class="col-md-3">
          <Tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tags from '@/views/Home/MyContainer/Tags'
import Banner from '@/views/Home/MyContainer/Banner'
import Article from '@/views/Home/MyContainer/Article'
export default {
  name: 'Container',
  components: { Tags, Banner, Article }
}
</script>
