<template>
  <section class="inner-content">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模拟强化</span>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in tabConfig" :key="index" :label="item.label" :name="item.value">
          <section class="upgrade-box">
            <div class="upgrade-item" v-for="(one, i) in infoData[activeName]" :key="i" @click="openUpgrade(one)">
              <el-image :src="one.src"></el-image>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <upgrade-dialog :visible.sync="dialogVisible" :row="row"></upgrade-dialog>
  </section>
</template>

<script>
import apis from '@/api'
import UpgradeDialog from './components/UpgradeDialog.vue'
export default {
  name: 'PenguinFightMartialUpgrade',
  components: {
    UpgradeDialog
  },
  data() {
    return {
      tabConfig: [
        {
          label: '武器',
          value: 'weapon'
        },
        {
          label: '技能',
          value: 'skill'
        }
      ],
      activeName: 'weapon',
      infoData: {},
      row: {},
      dialogVisible: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getInfoData()
    },
    getInfoData() {
      apis.getUpgradeInfo().then(res => {
        this.infoData = res?.data
      })
    },
    openUpgrade(row) {
      this.row = row
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  text-align: left;
}
</style>
