<template>
  <div>
    <div class="common-title">填写区</div>
    <section class="search">
      <div class="search-item">
        <div class="search-item-title">uid：</div>
        <div class="operate-item">
          <el-input v-model="uid" placeholder="请输入uid"></el-input>
        </div>
        <div class="search-item-title">h5openid：</div>
        <div class="operate-item">
          <el-input v-model="h5openid" placeholder="请输入h5openid"></el-input>
        </div>
        <div class="search-item-title">h5token：</div>
        <div class="operate-item">
          <el-input v-model="h5token" placeholder="请输入h5token"></el-input>
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
          <el-input-number :min="1" :max="20" v-model="level" :disabled="disabled"></el-input-number>
        </div>
      </div>
      <div class="search-item operate-box">
        <el-button @click="attack">开始挑战</el-button>
      </div>
    </section>
    <div class="common-title">展示区</div>
    <section class="table">
      <al-table :tableData="tableData" :headerSet="headerSet"></al-table>
    </section>
    <el-dialog :visible="dialogShow" @close="dialogShow = false" title="提示">
      <div v-if="dialogType === 'success'">
        <p>挑战成功，请自行上号替换或分解</p>
        <p>掉落物品：</p>
        <ul>
          <li v-for="(item, index) in dialogDropped" :key="index">{{ item }}</li>
        </ul>
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
      typeOptions: [
        { label: '关卡', value: 'guanqia' },
        { label: '首领', value: 'boss' }
      ],
      typeMap: {
        guanqia: '关卡',
        boss: '首领'
      },
      level: 1,
      tableData: [],
      headerSet: [
        { label: '时间', prop: 'time' },
        { label: '挑战次数', prop: 'times' },
        { label: '挑战类型', prop: 'type' },
        { label: '关数', prop: 'level' },
        { label: '结果', prop: 'result' }
      ],
      dialogType: 'success',
      dialogShow: false,
      dialogErrorInfo: '',
      dialogDropped: [],
      times: 0,
      disabled: false
    }
  },
  watch: {
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
  mounted() {
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
        level_id: this.level
      }
      this.disabled = true
      const data = await apis.attackGuanqia(params)
      const { result, dropped, msg } = data
      this.times++
      if (result !== 0) {
        this.tableData.push({
          time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
          type: this.typeMap[this.type],
          level: this.level,
          result: '异常',
          times: this.times
        })
        this.dialogType = 'error'
        this.dialogErrorInfo = msg
        this.dialogShow = true
        this.disabled = false
      } else {
        if (dropped && dropped.length > 0) {
          this.tableData.push({
            time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
            type: this.typeMap[this.type],
            level: this.level,
            result: '成功',
            times: this.times
          })
          this.dialogType = 'success'
          this.dialogDropped = dropped
          this.dialogShow = true
          this.disabled = false
        } else {
          this.tableData.push({
            time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
            type: this.typeMap[this.type],
            level: this.level,
            result: '失败',
            times: this.times
          })
          this.attackGuanqia()
        }
      }
    },
    async attackBoss() {
      const params = {
        uid: this.uid,
        h5openid: this.h5openid,
        h5token: this.h5token,
        boss_id: this.level
      }
      const data = await apis.attackBoss(params)
      const { result, dropped, msg } = data
      this.times++
      if (result !== 0) {
        this.tableData.push({
          time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
          type: this.typeMap[this.type],
          level: this.level,
          result: '异常',
          times: this.times
        })
        this.dialogType = 'error'
        this.dialogErrorInfo = msg
        this.dialogShow = true
      } else {
        if (dropped && dropped.length > 0) {
          this.tableData.push({
            time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
            type: this.typeMap[this.type],
            level: this.level,
            result: '成功',
            times: this.times
          })
          this.dialogType = 'success'
          this.dialogDropped = dropped
          this.dialogShow = true
        } else {
          this.tableData.push({
            time: new Date().toLocaleString() + ':' + new Date().getMilliseconds(),
            type: this.typeMap[this.type],
            level: this.level,
            result: '失败',
            times: this.times
          })
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
}
</style>
