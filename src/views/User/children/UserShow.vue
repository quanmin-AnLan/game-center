<template>
  <section class="user-show-main">
    {{$route.params.id}}用户的个人首页
  </section>
</template>

<script>

export default {
  name: 'UserShow',
  created() {
    // 如果进入页面的id不是数字则404
    if (isNaN(parseInt(this.$route.params.id))) {
      this.$router.push({path: '/DefaultError'})
    }
  }
}
</script>

<style lang="less" scoped>

</style>
