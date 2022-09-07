<template>
  <el-dialog title="强化模拟" :visible="visible" @close="handleCancel">
    {{row}}
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpgradeDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
