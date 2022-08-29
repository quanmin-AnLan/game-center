<template>
  <section class="penguin-fight-main">
    <al-menu :menuData="config.menuData"></al-menu>
    <section class="penguin-fight-container">全民大乐斗主页</section>
  </section>
</template>

<script>
import { config } from './config'
export default {
  name: 'PenguinFightHome',
  data() {
    return {
      config
    }
  }
}
</script>

<style lang="less" scoped>
.penguin-fight-main {
  display: flex;
}
.penguin-fight-container {
  flex: 1;
}
</style>