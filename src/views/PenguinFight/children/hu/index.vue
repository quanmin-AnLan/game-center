<template>
  <div>
    <div class="common-title">填写区</div>
    <section class="search">
      <div class="search-item">
        <div class="search-item-title">区服：</div>
        <div class="operate-item">
          <el-select v-model="region" placeholder="请选择区服" :disabled="disabled">
            <el-option v-for="(item, index) in regionOptions" :key="index" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item-title">uid：</div>
        <div class="operate-item">
          <el-input v-model.trim="uid" placeholder="请输入uid" :disabled="disabled"></el-input>
        </div>
        <div class="search-item-title">h5openid：</div>
        <div class="operate-item">
          <el-input v-model.trim="h5openid" placeholder="请输入h5openid" :disabled="disabled"></el-input>
        </div>
        <div class="search-item-title">h5token：</div>
        <div class="operate-item">
          <el-input v-model.trim="h5token" placeholder="请输入h5token" :disabled="disabled"></el-input>
        </div>
      </div>
      <div class="search-item custom-box">
        <div class="search-item-title">
          挑战类型
          <el-tooltip class="item" effect="dark" content="首领要钥匙,关卡随便刷" placement="top">
            <i class="el-icon-warning-outline"></i>
          </el-tooltip>：
        </div>
        <div class="operate-item">
          <el-select v-model="type" placeholder="请选择挑战类型" :disabled="disabled">
            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item-title">关数：</div>
        <div class="operate-item">
          <el-input-number :min="1" :max="maxNumber" v-model="level" :disabled="disabled"></el-input-number>
        </div>
      </div>
      <div class="search-item operate-box">
        <el-button @click="getHuInfo">查看属性</el-button>
        <el-button @click="attack">开始挑战</el-button>
      </div>
    </section>
    <div class="common-title">展示区</div>
    <section class="table">
      <al-table :tableData="pageTableData" :headerSet="headerSet"></al-table>
      <el-pagination class="pagination" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageSize" :total="tableData.length" :current-page.sync="page">
      </el-pagination>
    </section>
    <el-drawer :visible.sync="drawerShow" direction="rtl" :size="1300">
      <div class="drawer-text-title">总属性</div>
      <div class="drawer-text">{{ washDropped.attrs }}</div>
      <section class="table">
        <al-table :tableData="attrData" :headerSet="attrHeader"></al-table>
      </section>
    </el-drawer>
    <el-dialog :visible="dialogShow" @close="dialogShow = false" title="提示">
      <div v-if="dialogType === 'success'" class="dialog-success">
        <div class="success-title">挑战成功，请自行上号替换或分解</div>
        <div class="success-info-title">当前属性：</div>
        <div class="success-info">{{ washDropped.attrs }}</div>
        <div class="success-box">
          <div class="box-item">
            <div class="box-title">当前物品：</div>
            <div class="box-info">
              <div>
                <p>{{ washDropped.oldVal.name }}</p>
                <p>等级：{{ washDropped.oldVal.level }}</p>
                <p>战力：{{ washDropped.oldVal.point }}</p>
                <p>主属性：{{ washDropped.oldVal.primary_attrs }}</p>
                <p>副属性：{{ washDropped.oldVal.sub_attrs }}</p>
              </div>
            </div>
          </div>
          <div class="box-item">
            <div class="box-title">掉落物品：</div>
            <div class="box-info">
              <div>
                <p>{{ washDropped.newVal.name }}</p>
                <p>等级：{{ washDropped.newVal.level }}</p>
                <p>战力：{{ washDropped.newVal.point }}</p>
                <p>主属性：{{ washDropped.newVal.primary_attrs }}</p>
                <p>副属性：{{ washDropped.newVal.sub_attrs }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>{{ dialogErrorInfo }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apis from '@/api'
export default {
  name: 'HuIndex',
  data() {
    return {
      uid: '',
      h5openid: '',
      h5token: '',
      type: 'guanqia',
      region: '301',
      typeOptions: [
        { label: '关卡', value: 'guanqia' },
        { label: '首领', value: 'boss' }
      ],
      typeMap: {
        guanqia: '关卡',
        boss: '首领'
      },
      regionOptions: [
        // { label: '手q区', value: '1' },
        { label: '空间1区', value: '301' },
        // { label: '空间2区', value: '14' },
        // { label: '空间3区', value: '15' },
        { label: '空间6区', value: '26' },
        { label: '空间7区', value: '28' },
        // { label: '空间8区', value: '30' },
        // { label: '空间9区', value: '32' },
        { label: '微信1区', value: '4' },
        // { label: '微信2区', value: '5' },
        // { label: '微信6区', value: '12' },
        // { label: '微信12区', value: '23' },
        // { label: '微信15区', value: '29' },
        // { label: '微信16区', value: '31' },
        // { label: '微信H5区', value: '2' }
      ],
      level: 1,
      tableData: [],
      headerSet: [
        { label: '时间', prop: 'time' },
        { label: '挑战次数', prop: 'times' },
        { label: '挑战类型', prop: 'type' },
        { label: '关数', prop: 'level' },
        { label: '结果', prop: 'result' }
      ],
      attrData: [],
      attrHeader: [
        { label: '名称', prop: 'name', width: 150 },
        { label: '装备等级', prop: 'level', width: 100 },
        { label: '战力', prop: 'point', width: 100 },
        { label: '强化等级', prop: 'upgrade_level', width: 100 },
        { label: '主属性', prop: 'primary_attrs', width: 250 },
        { label: '副属性', prop: 'sub_attrs' }
      ],
      page: 1,
      pageSize: 10,
      drawerShow: false,
      dialogType: 'success',
      dialogShow: false,
      dialogErrorInfo: '',
      dialogDropped: [],
      times: 0,
      disabled: false
    }
  },
  watch: {
    region (val) {
      localStorage.setItem('region', val)
    },
    uid (val) {
      localStorage.setItem('uid', val)
    },
    h5openid (val) {
      localStorage.setItem('h5openid', val)
    },
    h5token (val) {
      localStorage.setItem('h5token', val)
    }
  },
  computed: {
    washDropped () {
      const base = this.dialogDropped
      const newVal = base.dropped && base.dropped[0] || {}
      const oldVal = (base.equipments && base.equipments.find(item => item.type === newVal.type)) || {}
      const attrs = base.attrs || ''
      return { newVal, oldVal, attrs }
    },
    pageTableData () {
      return this.tableData.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
    },
    maxNumber () {
      if (this.type === 'guanqia') {
        return 20
      } else if (this.type === 'boss') {
        return 25
      }
      return 1
    }
  },
  mounted() {
    this.region = localStorage.getItem('region') || '301'
    this.uid = localStorage.getItem('uid') || ''
    this.h5openid = localStorage.getItem('h5openid') || ''
    this.h5token = localStorage.getItem('h5token') || ''
  },
  methods: {
    async attackGuanqia() {
      const params = {
        uid: this.uid,
        h5openid: this.h5openid,
        h5token: this.h5token,
        level_id: this.level,
        region: this.region
      }
      this.disabled = true
      const data = await apis.attackGuanqia(params)
      const isContinue = await this.attackCommonCallback(data)
      if (isContinue) {
        this.attackGuanqia()
      }
    },
    async getHuInfo() {
      const params = {
        uid: this.uid,
        h5openid: this.h5openid,
        h5token: this.h5token,
        region: this.region
      }
      const data = await apis.getHuInfo(params)
      const { equipments, divines, skins, slots } = data
      this.dialogDropped = data
      const arr = equipments.concat(divines.filter(item => item.left_time !== 0)).concat(skins.filter(item => item.left_time !== 0))
      for (let i = 0; i < arr.length; i++) {
        const slot = slots.find(item => item.equipment_id === arr[i].equipment_id)
        if (slot) {
          arr[i].upgrade_level = slot.level
        } else {
          arr[i].upgrade_level = '未装备'
        }
      }
      this.attrData = arr.map(item => {
        return {
          name: item.name,
          level: item.level,
          upgrade_level: item.upgrade_level,
          point: item.point,
          primary_attrs: item.primary_attrs,
          sub_attrs: item.sub_attrs
        }
      })
      this.drawerShow = true
    },
    async attackBoss() {
      const params = {
        uid: this.uid,
        h5openid: this.h5openid,
        h5token: this.h5token,
        boss_id: this.level,
        region: this.region
      }
      if ([21, 22, 23, 24, 25].includes(this.level)) {
        const bossLevelMap = {
          21: 35,
          22: 36,
          23: 37,
          24: 38,
          25: 39
        }
        params.boss_id = bossLevelMap[this.level]
      }
      this.disabled = true
      const data = await apis.attackBoss(params)
      this.attackCommonCallback(data)
    },
    attackCommonCallback (data) {
      const { result, dropped, msg } = data
      this.times++
      const obj = {
        time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
        type: this.typeMap[this.type],
        level: this.level,
        times: this.times
      }
      if (result !== 0) {
        obj.result = '异常'
        this.tableData.push(obj)
        this.dialogType = 'error'
        this.dialogErrorInfo = msg
        this.dialogShow = true
        this.disabled = false
      } else {
        if (dropped && dropped.length > 0) {
          obj.result = '成功'
          this.tableData.push(obj)
          this.dialogType = 'success'
          this.dialogDropped = data
          this.dialogShow = true
          this.disabled = false
        } else {
          obj.result = '失败'
          this.tableData.push(obj)
          return true
        }
      }
    },
    attack () {
      const obj = {
        guanqia: () => {
          this.attackGuanqia()
        },
        boss: () => {
          this.attackBoss()
        }
      }
      obj[this.type]()
    }
  }
}
</script>

<style lang="less" scoped>
.common-title {
  font-size: 18px;
  margin: 36px 0;
}

.search {
  width: 1200px;
  margin: 0 auto;
  font-size: 16px;

  .search-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .operate-item {
      margin-right: 8px;
    }
  }
  .operate-box {
    justify-content: center;
  }
}
.table {
  width: 1200px;
  margin: 0 auto;
  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
.dialog-success {
  .success-title {
    font-size: 18px;
    color: green;
    margin-bottom: 20px;
  }
  .success-info-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
  }
  .success-info {
    margin-bottom: 20px;
    text-align: left;
  }
  .success-box {
    display: flex;
    justify-content: space-between;
    .box-item {
      width: 50%;
      border: 1px solid black;
      .box-title {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
.el-drawer__wrapper {
  margin-top: 48px;
  .drawer-text-title {
    font-size: 16px;
  }
  .drawer-text {
    font-size: 14px;
    text-align: left;
    width: 1200px;
    margin: 20px auto;
  }
}
</style>
