<template>
  <section>
    <iframe src="https://minecraft.fandom.com/zh/wiki/Minecraft_Wiki" frameborder="0" class="iframe-box"></iframe>
  </section>
</template>

<script>
export default {
  name: 'MCHome',
}
</script>

<style lang="less" scoped>
.iframe-box {
  width: 100%;
  height: calc(100vh - 48px);
}
</style>