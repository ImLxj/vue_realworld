<template>
  <div :class="['bounced', 'alert', type]" role="alert">{{ message }}</div>
</template>

<script>
export default {
  name: 'Bounced',
  props: ['message', 'type']
}
</script>

<style lang="less" scoped>
.bounced {
  width: 400px;
  height: 60px;
  text-align: center;
  line-height: 30px;
  margin: 20px auto;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounced 1s ease-out forwards;
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
