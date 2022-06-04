<template>
  <div class="bounced">{{ message }}</div>
</template>

<script>
export default {
  name: 'Bounced',
  props: ['message']
}
</script>

<style lang="less" scoped>
.bounced {
  width: 350px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: gray;
  color: aliceblue;
  border-radius: 10px;
  margin: 20px auto;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounced 1s linear forwards;
}
@keyframes bounced {
  0% {
    margin-top: -100px;
    opacity: 1;
  }
  60% {
    margin-top: 20px;
    opacity: 1;
  }
  100% {
    margin-top: 20px;
    opacity: 0;
  }
}
</style>
