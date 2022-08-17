<template>
  <section class="user-info-main">
    本人信息展示
    <el-button @click="$router.push({path: '/UserCenter/edit'})">编辑</el-button>
  </section>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style lang="less" scoped>
</style>
