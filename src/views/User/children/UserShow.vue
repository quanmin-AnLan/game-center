<template>
  <section class="user-show-main">
    {{ $route.params.id }}用户的个人首页
    {{ userData }}
    <el-button v-if="Number($route.params.id) === $store.state.userInfo.id" @click="$router.push({ path: '/UserCenter/edit' })">编辑个人资料</el-button>
  </section>
</template>

<script>
import apis from '@/api'
export default {
  name: 'UserShow',
  data() {
    return {
      userData: {}
    }
  },
  created() {
    // 如果进入页面的id不是数字则404
    if (isNaN(parseInt(this.$route.params.id))) {
      this.$router.push({path: '/DefaultError'})
    }
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const params = {
        id: this.$route.params.id,
        type: 'id'
      }
      apis.getUserInfo(params).then(res => {
        if (!res.id) {
          this.$router.push({ path: '/DefaultError' })
        } else {
          this.userData = res
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
