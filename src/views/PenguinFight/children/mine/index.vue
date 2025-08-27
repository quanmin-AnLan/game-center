<template>
  <div class="mine-container">
    <div class="search-item">
      <div class="search-item-title">区服：</div>
      <div class="operate-item">
        <el-select v-model="region" placeholder="请选择区服">
          <el-option v-for="(item, index) in regionOptions" :key="index" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="search-item-title">uid：</div>
      <div class="operate-item">
        <el-input v-model.trim="uid" placeholder="请输入uid"></el-input>
      </div>
      <div class="search-item-title">h5openid：</div>
      <div class="operate-item">
        <el-input v-model.trim="h5openid" placeholder="请输入h5openid"></el-input>
      </div>
      <div class="search-item-title">h5token：</div>
      <div class="operate-item">
        <el-input v-model.trim="h5token" placeholder="请输入h5token"></el-input>
      </div>
    </div>
    <div class="mine-operate">
      <div class="mine-operate-item">
        <div class="mine-operate-item-text">筛选类型</div>
        <el-select v-model="searchKey">
          <el-option v-for="(item, index) in selectOptions" :key="index" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="mine-operate-item">
        <div class="mine-operate-item-text">筛选内容</div>
        <el-input v-model="searchValue" placeholder="请输入筛选内容"></el-input>
      </div>
      <div class="mine-operate-item">
        <el-button @click="getSearchTableData" :disabled="loading">查询</el-button>
      </div>
      <div class="mine-operate-item">
        <el-button @click="clear" :disabled="loading">清空</el-button>
      </div>
    </div>
    <div class="mine-operate" v-if="tableType !== 'search'">
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
          prop: 'page',
          label: '页码'
        },
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
      uid: '',
      h5openid: '',
      h5token: '',
      region: '301',
      regionOptions: [
        // { label: '手q区', value: '1' },
        { label: '空间1区', value: '301' },
        // { label: '空间2区', value: '14' },
        // { label: '空间3区', value: '15' },
        { label: '空间6区', value: '26' },
        { label: '空间7区', value: '28' },
        { label: '空间8区', value: '30' },
        // { label: '空间9区', value: '32' },
        { label: '微信1区', value: '4' },
        // { label: '微信2区', value: '5' },
        // { label: '微信6区', value: '12' },
        { label: '微信12区', value: '23' },
        // { label: '微信15区', value: '29' },
        // { label: '微信16区', value: '31' },
        // { label: '微信H5区', value: '2' }
      ],
      page: 1,
      loading: false,
      selectOptions: [
        {
          label: '帮派',
          value: 'fac_name'
        },
        {
          label: '昵称',
          value: 'role_name'
        }
      ],
      searchKey: '',
      searchValue: '',
      tableType: ''
    }
  },
  mounted () {
    this.region = localStorage.getItem('region') || '301'
    this.uid = localStorage.getItem('uid') || ''
    this.h5openid = localStorage.getItem('h5openid') || ''
    this.h5token = localStorage.getItem('h5token') || ''
    this.getTableData()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getTableData()
    },
    clear() {
      this.searchKey = ''
      this.searchValue = ''
      this.tableType = ''
      this.page = 1
      this.getTableData()
    },
    async getTableData () {
      this.loading = true
      const params = {
        page: this.page,
        uid: this.uid,
        h5openid: this.h5openid,
        h5token: this.h5token,
        region: this.region
      }
      try {
        const data = await apis.getMineList(params)
        this.tableData = data
        this.loading = false
      } catch (err) {
        this.loading = false
        this.tableData = []
        console.error(err)
      }
    },
    async getSearchTableData() {
      if (!this.searchKey || !this.searchValue) {
        this.$message.error('请先选择筛选类型和筛选内容')
        return
      }
      this.tableType = 'search'
      const arr = [20, 40, 60, 80, 100]
      const result = []
      this.loading = true
      for (let i = 0; i < 5; i++) {
        const params = {
          page: this.page,
          searchKey: this.searchKey,
          searchValue: this.searchValue,
          searchRange: arr[i],
          uid: this.uid,
          h5openid: this.h5openid,
          h5token: this.h5token,
          region: this.region
        }
        if (this.searchKey === 'role_name') {
          params.searchValue = encodeURIComponent(this.searchValue)
        }
        this.$message.info(`正在获取${arr[i] - 19}-${arr[i]}页数据`)
        try {
          const data = await apis.getMineList(params)
          result.push(...data)
        } catch (err) {
          console.log(err)
        }
      }
      this.tableData = result
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.search-item {
  display: flex;
  align-items: center;
  margin: 20px auto;
  width: 100%;
  justify-content: center;
  .operate-item {
    margin-right: 8px;
  }
}
.mine-operate {
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .mine-operate-item {
    display: flex;
    align-items: center;
    margin-right: 8px;
    .mine-operate-item-text {
      width: 100px;
      margin-right: 8px;
    }
  }
}
</style>
