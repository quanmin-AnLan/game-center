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
        5: '微信2区',
        12: '微信6区',
        23: '微信12区',
        29: '微信15区',
        31: '微信16区',
        301: '空间1区',
        14: '空间2区',
        15: '空间3区',
        26: '空间6区',
        28: '空间7区',
        30: '空间8区',
        32: '空间9区',
        2: '微信H5区',
        1: '手q区'
      },
      typeMap: {
        level: '关卡',
        boss: '首领'
      },
      headerSet: [
        {
          prop: 'date',
          label: '日期',
          sortable: true
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
