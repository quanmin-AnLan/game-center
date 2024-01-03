<template>
  <section class="inner-content">
    <!-- 功能区 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane v-for="(item, index) in tabConfig" :key="index" :label="item.label" :name="item.value">
          <section class="upgrade-box">
            <div class="upgrade-item" v-for="(one, i) in skinData[activeName]" :key="i" @click="openDialog(one)">
              <el-image :src="$fn.toWebp(one.img)"></el-image>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 弹窗 -->
    <skin-dialog :visible.sync="dialogVisible" :row="row"></skin-dialog>
  </section>
</template>

<script>
import apis from '@/api'
import SkinDialog from './components/SkinDialog.vue'
export default {
  name: 'PenguinFightSkin',
  components: {
    SkinDialog
  },
  data() {
    return {
      tabConfig: [
        {
          label: '人物替身',
          value: 'role'
        },
        {
          label: '武器幻化',
          value: 'weapon'
        }
      ],
      activeName: 'role',
      skinData: {},
      row: {},
      dialogVisible: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getSkinData()
    },
    getSkinData() {
      apis.getSkinInfo().then(res => {
        this.skinData = res
      })
    },
    openDialog (row) {
      let result = row
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
