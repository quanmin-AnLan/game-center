<template>
  <div id="app">
    <router-view />
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