<template>
  <div class="mine-container">
    <div class="mine-operate">
      <el-pagination layout="prev, pager, next, jumper" :total="1000" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <al-table :tableData="tableData" :headerSet="headerSet" v-loading="loading">
      <template v-slot:special-content-role_name="{ scope }">
        {{ scope.row.role_name ? decodeURIComponent(scope.row.role_name) : '没人' }}
      </template>
    </al-table>
  </div>
</template>

<script>
import apis from '@/api'
export default {
  name: 'MineIndex',
  data() {
    return {
      tableData: [],
      headerSet: [
        {
          prop: 'level',
          label: '矿位等级'
        },
        {
          prop: 'fac_name',
          label: '帮派'
        },
        {
          prop: 'role_name',
          label: '昵称',
          specialContent: true
        },
        {
          prop: 'fight_power',
          label: '战力'
        },
        {
          prop: 'get_per_minute',
          label: '每分钟收益'
        },
        {
          prop: 'total_get',
          label: '当前总收益'
        }
      ],
      page: 1,
      loading: false
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getTableData()
    },
    getTableData() {
      this.loading = true
      const params = {
        page: this.page
      }
      apis.getMineList(params).then(data => {
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mine-operate {
  margin: 20px auto;
}
</style>
