<template>
  <section class="inner-content">
    <!-- 静态图片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc)" :preview-src-list="[$fn.toWebp(imgSrc)]" lazy fit="fill"></el-image>
    </el-card>
    <!-- 功能区 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>模拟强化</span>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in tabConfig" :key="index" :label="item.label" :name="item.value">
          <section class="upgrade-box">
            <div class="upgrade-item" v-for="(one, i) in toolData[activeName]" :key="i" @click="openUpgrade(one)">
              <el-image :src="$fn.toWebp(one.cover)"></el-image>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 弹窗 -->
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
      toolData: {},
      infoData: {},
      row: {},
      dialogVisible: false,
      imgSrc: 'http://img.anlan.xyz/ledou/linli/qianghua.png'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getToolData()
      this.getInfoData()
    },
    getToolData() {
      apis.getToolInfo().then(res => {
        this.toolData = res
      })
    },
    getInfoData() {
      apis.getUpgradeInfo().then(res => {
        this.infoData = res
      })
    },
    openUpgrade(row) {
      let result = row
      result.info = this.infoData[this.activeName][row.type - 1]
      this.row = result
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  text-align: left;
  margin-bottom: 24px;
}
.upgrade-box {
  display: flex;
  flex-wrap: wrap;
}
.upgrade-item {
  width: 120px;
  height: 120px;
  margin: 0 8px 8px 0;
  cursor: pointer;
}
</style>
