<template>
  <section class="home"></section>
</template>

<script>
export default {
  name: 'DefaultHome',
  mounted() {
    this.$fn.changeRoute()
  }
}
</script>

<style lang="less" scoped>
.home {
  margin-top: -48px;
  min-height: 100vh;
  background: url('http://img.anlan.xyz/anlan/bg2.jpeg');
  background-size: 100%;
}
</style>
