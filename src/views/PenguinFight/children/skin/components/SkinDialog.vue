<template>
  <el-dialog :title="`${row.name} - 属性展示`" :visible="visible" @close="handleCancel" width="80%">
    <section>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in tabConfig" :key="index" :label="item.label" :name="item.value">
          <section v-if="row.info">
            <div v-for="(one, i) in row.info[activeName]" :key="i">
              {{ one }}
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'SkinDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      tabConfig: [
        {
          label: '1星',
          value: '1'
        },
        {
          label: '2星',
          value: '2'
        },
        {
          label: '3星',
          value: '3'
        },
        {
          label: '4星',
          value: '4'
        },
        {
          label: '5星',
          value: '5'
        }
      ],
      activeName: '1'
    }
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
      Object.assign(this.$data, this.$options.data.call(this))
    },
  }
}
</script>

<style lang="less" scoped>

</style>
