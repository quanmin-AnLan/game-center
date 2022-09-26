<template>
  <section>
    <iframe src="https://lol.qq.com/" frameborder="0" class="iframe-box"></iframe>
  </section>
</template>

<script>
export default {
  name: 'LOLHome',
}
</script>

<style lang="less" scoped>
.iframe-box {
  width: 100%;
  height: calc(100vh - 48px);
}
</style>