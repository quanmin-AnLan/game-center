<template>
  <div id="app">
    <router-view />
    <al-login></al-login>
  </div>
</template>

<script>
export default {
  mounted() {
    const userInfo = sessionStorage.getItem('user_info')
    userInfo && this.$store.commit('SetUserInfo', JSON.parse(userInfo))
  }
}
</script>