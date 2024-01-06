<template>
  <section class="inner-content">
    <div>
      <span>name</span>
      <el-input v-model="skinName"></el-input>
    </div>
    <div>
      <span>type</span>
      <el-input v-model="skinType"></el-input>
    </div>
    <div>
      <span>id</span>
      <el-input v-model="skinId"></el-input>
    </div>
    <div>
      <span>info1</span>
      <el-input v-model="skinInfo1"></el-input>
    </div>
    <div>
      <span>info2</span>
      <el-input v-model="skinInfo2"></el-input>
    </div>
    <div>
      <span>info3</span>
      <el-input v-model="skinInfo3"></el-input>
    </div>
    <div>
      <span>info4</span>
      <el-input v-model="skinInfo4"></el-input>
    </div>
    <div>
      <span>info5</span>
      <el-input v-model="skinInfo5"></el-input>
    </div>
    <button @click="submit()">提交</button>
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
      skinName: '',
      skinType: '',
      skinId: '',
      skinInfo1: '',
      skinInfo2: '',
      skinInfo3: '',
      skinInfo4: '',
      skinInfo5: ''
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
    },
    submit() {
      if (!this.skinName || !this.skinType || !this.skinId || !this.skinInfo1 || !this.skinInfo2 || !this.skinInfo3 || !this.skinInfo4 || !this.skinInfo5) {
        this.$message.error('滚')
        return
      }
      const params = {
        name: this.skinName,
        type: this.skinType,
        id: this.skinId,
        info1: this.skinInfo1,
        info2: this.skinInfo2,
        info3: this.skinInfo3,
        info4: this.skinInfo4,
        info5: this.skinInfo5
      }
      apis.addSkin(params).then(res => {
        console.log(res);
      })
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
