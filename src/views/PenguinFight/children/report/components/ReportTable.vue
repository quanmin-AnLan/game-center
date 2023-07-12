<template>
  <section style="margin: 0 20px;">
    <al-table :headerSet="headerSet" :tableData="tableData">
      <template v-slot:special-content-operate="scope">
        <el-button @click="audit(scope, '通过')">通过</el-button>
        <el-button @click="audit(scope, '驳回')">驳回</el-button>
      </template>
    </al-table>
  </section>
</template>

<script>
import apis from '@/api'
export default {
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    headerSet() {
      const base = [
        {
          prop: 'region',
          label: '区服',
        },
        {
          prop: 'userId',
          label: 'ID',
        },
        {
          prop: 'img',
          label: '截图',
        },
        {
          prop: 'reason',
          label: '举报理由'
        },
        {
          prop: 'status',
          label: '状态',
        },
      ]
      const level = this.$store.state.userInfo.level
      if (level > 4) {
        base.push({
          prop: 'operate',
          label: '操作',
          specialContent: true
        })
      }
      return base
    }
  },
  methods: {
    getList() {
      apis.getReportList().then(res => {
        this.tableData = res
      })
    },
    audit(scope, status) {
      const row = scope.scope.row
      const params = {
        region: row.region,
        userId: row.userId,
        status: status,
        level: 4
      }
      apis.auditReport(params).then(() => {
        this.getList()
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>

</style>
