<template>
  <div>
    <my-header></my-header>
    <my-container></my-container>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyContainer from '@/components/MyContainer'
export default {
  name: 'Home',
  components: { MyHeader, MyContainer }
}
</script>

<style></style>
