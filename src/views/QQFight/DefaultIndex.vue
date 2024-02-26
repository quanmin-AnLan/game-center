<template>
  <section class="qq-fight-main">
    <al-menu :menuData="config.menuData" menuKey="/QQFight"></al-menu>
    <section class="qq-fight-container">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import { config } from './config'
export default {
  name: 'QQFightHome',
  data() {
    return {
      config
    }
  }
}
</script>

<style lang="less" scoped>
.qq-fight-main {
  display: flex;
}
.qq-fight-container {
  flex: 1;
  height: calc(100vh - 48px);
  overflow: auto;
}
</style>