<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'

export default {
  name: 'Home',
  components: { MyHeader }
}
</script>

<style></style>
