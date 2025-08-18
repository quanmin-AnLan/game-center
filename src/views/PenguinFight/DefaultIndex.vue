<template>
  <section class="penguin-fight-main">
    <al-menu :menuData="config.menuData" menuKey="/PenguinFight"></al-menu>
    <al-outlink v-if="$store.state.app.showOutlink" />
    <section class="penguin-fight-container" v-else>
      <router-view></router-view>
    </section>
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
  min-height: calc(100vh - 48px);
  overflow: auto;
}
</style>