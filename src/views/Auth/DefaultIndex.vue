<template>
  <section class="auth-main">
    <al-table :tableData="tableData" :headerSet="headerSet">
      <template v-slot:special-content-operate="{ scope }">
        <i class="el-icon-edit-outline common-icon" @click="operate('edit', scope.row)"></i>
      </template>
    </al-table>
    <auth-dialog :dialogVisible.sync="dialogVisible" :dialogType="type" :row="row"></auth-dialog>
  </section>
</template>

<script>
import apis from '@/api'
import { authConfig } from './config'
import AuthDialog from './components/AuthDialog.vue'
export default {
  name: 'AuthModule',
  data() {
    return {
      headerSet: [
        {
          prop: 'user',
          label: '用户名'
        },
        {
          prop: 'level',
          label: '权限',
          map: authConfig.authList
        },
        {
          prop: 'operate',
          label: '操作',
          specialContent: true
        }
      ],
      tableData: [],
      dialogVisible: false,
      type: '',
      row: {},
    }
  },
  mounted() {
    this.getUserList()
  },
  components: {
    AuthDialog,
  },
  methods: {
    getUserList() {
      apis.getUserList().then(res => {
        this.tableData = res.data
      })
    },
    operate(type, data) {
      this.type = type
      switch (type) {
        case 'edit':
          this.row = data
          this.dialogVisible = true
          break;
      }
    },
    editAuth() {
      apis.changeUserAuth()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
