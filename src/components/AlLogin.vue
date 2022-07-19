<template>
  <div>
    <al-upload @imgSrc="getImgSrc"></al-upload>
  </div>
</template>

<script>
import apis from '@/api'
export default {
  name: 'AlLogin',
  methods: {
    register() {
      const src = this.getImgSrc
      const params = {

      }
      apis.register(params).then(res => {

      })
    },
    login() {
      const params = {

      }
      apis.login(params).then(res => {

      })
    },
    getImgSrc(src) {
      return src || ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
