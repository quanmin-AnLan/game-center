<template>
  <el-button @click="testClick">测试全局组件</el-button>
</template>

<script>
export default {
  name: 'AlModuleList',
  methods: {
    testClick() {
      this.$message({
        message: 'element初始化成功',
        type: 'success',
      })
    }
  }
}
</script>
