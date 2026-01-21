<template>
  <div id="app">
    <al-nav v-if="isShowNav"></al-nav>
    <al-module-list></al-module-list>
    <section class="app-container">
      <router-view />
    </section>
    <al-login></al-login>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$fn.refreshUserInfo()
  },
  watch: {
    '$route.path': {
      handler (newVal) {
        this.isShowNav = newVal !== '/Special/eekp'
      },
      immediate: true
    }
  }
}
</script>

<style>
.app-container {
  box-sizing: border-box;
  padding-top: 48px;
}
</style>