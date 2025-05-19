<template>
  <section class="iframe-container">
    <div @click="$store.dispatch('app/UpdateShowOutlink', false)">我是返回</div>
    <iframe class="iframe-main" :src="$store.state.app.OutlinkSrc"></iframe>
  </section>
</template>

<script>
export default {
  name: 'AlOutlink',
}
</script>

<style lang="less" scoped>
.iframe-container {
  width: 100%;
}
.iframe-main {
  width: 100%;
  height: 100%;
}
</style>
