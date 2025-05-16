<template>
  <al-table :tableData="tableData" :headerSet="headerSet">
    <template v-slot:special-content-region="{scope}">
      {{ regionMap[scope.row.region] }}
    </template>
    <template v-slot:special-content-type="{ scope }">
      {{ typeMap[scope.row.type] }}
    </template>
  </al-table>
</template>

<script>
import apis from '@/api'
export default {
  name: 'toolIndex',
  data () {
    return {
      tableData: [],
      regionMap: {
        4: '微信1区',
        301: '空间1区'
      },
      typeMap: {
        level: '关卡',
        boss: '首领'
      },
      headerSet: [
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'name',
          label: '昵称'
        },
        {
          prop: 'region',
          label: '区服',
          specialContent: true
        },
        {
          prop: 'uid',
          label: 'id'
        },
        {
          prop: 'type',
          label: '类型',
          specialContent: true
        },
        {
          prop: 'value',
          label: '次数'
        }
      ],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList () {
      apis.getToolReport().then(data => {
        this.tableData = data
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
