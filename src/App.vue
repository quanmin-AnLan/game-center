<template>
  <div id="app">
    <al-nav></al-nav>
    <al-module-list></al-module-list>
    <section class="app-container">
      <router-view />
    </section>
    <al-login></al-login>
  </div>
</template>

<script>
import apis from '@/api'
export default {
  mounted() {
    const userInfo = localStorage.getItem('user_info')
    if (userInfo) {
      const params = {
        id: JSON.parse(userInfo)?.uuid,
        type: 'uuid'
      }
      apis.getUserInfo(params).then(res => {
        if (res.uuid) {
          this.$store.commit('SetUserInfo', res)
          localStorage.setItem('user_info', JSON.stringify(res))
        }
      })
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