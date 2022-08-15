<template>
  <el-dialog :title="typeMap[dialogType] && typeMap[dialogType].title" :visible="dialogVisible" @close="handleCancel">
    <span>将用户{{washRow.user}}的权限改为：</span>
    <el-select v-model="washRow.level">
      <el-option v-for="(item, index) in washConfig" :key="index" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import apis from '@/api'
import { authConfig } from '../config'
export default {
  name: 'AuthDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogType: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      typeMap: {
        edit: {
          title: '编辑权限'
        }
      }
    }
  },
  computed: {
    washConfig() {
      const base = JSON.parse(JSON.stringify(authConfig.authList))
      const arr = []
      for (const item in base) {
        arr.push({
          label: base[item],
          value: item
        })
      }
      return arr
    },
    washRow() {
      return this.row
    }
  },
  methods: {
    submit() {
      const params = {
        id: this.washRow?.id,
        level: this.washRow?.level
      }
      switch (this.dialogType) {
        case 'edit':
          apis.changeUserAuth(params)
          break;
      }
      this.handleCancel()
    },
    handleCancel() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
