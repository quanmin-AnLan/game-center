<template>
  <section class="inner-content">
    <!-- 功能区 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="tabChange">
        <el-tab-pane v-for="(item, index) in tabConfig" :key="index" :label="item.label" :name="item.value">
          <section class="select-box">
            <div class="select-name">属性筛选：</div>
            <el-select v-model="selectActive">
              <el-option v-for="(item, index) in selectConfig[activeName]" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </section>
          <section class="upgrade-box">
            <div class="upgrade-item" v-for="(one, i) in washSkinData" :key="i" @click="openDialog(one)">
              <el-image :src="$fn.toWebp(one.img)"></el-image>
            </div>
          </section>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 弹窗 -->
    <skin-dialog :visible.sync="dialogVisible" :row="row"></skin-dialog>
    <!-- 公告 -->
    <el-dialog title="公告" :visible.sync="show" width="30%">
      <div>数据由广大玩家提供，非官方数据，可能存在误差</div>
      <div>数据不全，有数据的好心人可带图联系我</div>
      <div>属性错误也可联系我指正</div>
      <div>最终解释权归安澜所有</div>
      <div>qq:2016751527</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setLocalStorage">关闭且不再提示</el-button>
        <el-button type="primary" @click="dialogClose">关闭</el-button>
      </span>
    </el-dialog>
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
      selectActive: '全部',
      selectConfig: {
        role: ['全部','抵挡穿透','抵挡减伤','最终伤害加成','最终伤害减免','抵挡','破防','暴击','抗暴击','暴击伤害','连击','穿透','抗眩晕几率','眩晕几率','速度','生命倍率','结界强度','技能伤害','技能减免','命中','闪避','伤害减免','吸血'],
        weapon: ['全部','抵挡穿透','抵挡减伤','最终伤害加成','抵挡','破防','暴击','抗暴击','暴击伤害','暴伤减免','连击','穿透','伤害减免','攻击力','武器伤害','命中','闪避','吸血']
      },
      show: false
    }
  },
  computed: {
    washSkinData() {
      const baseData = JSON.parse(JSON.stringify(this.skinData))
      const activeData = baseData[this.activeName]
      let data = []
      if (this.selectActive !== '全部' && data) {
        for (const item of activeData) {
          const info = item.info
          for (const i in info) {
            const infoItem = info[i]
            const str = infoItem.join(',')
            if (str.includes(this.selectActive) && !data.includes(item)) {
              if (this.selectActive === '暴击' && (str.includes('抗暴击') || str.includes('暴击伤害'))) {
                // console.log('属性不对');
              } else if (this.selectActive === '伤害减免' && str.includes('最终伤害减免')) {
                // console.log('属性不对');
              } else if (this.selectActive === '眩晕几率' && str.includes('抗眩晕几率')) {
                // console.log('属性不对');
              } else if (this.selectActive === '抵挡' && (str.includes('抵挡穿透') || str.includes('抵挡减伤'))){
                // console.log('属性不对');
              } else if (this.selectActive === '穿透' && str.includes('抵挡穿透')) {
                // console.log('属性不对');
              } else {
                data.push(item)
              }
            }
          }
        }
      } else {
        data = activeData
      }
      return data
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getSkinData()
      this.checkLocalStorage()
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
    tabChange() {
      this.selectActive = '全部'
    },
    dialogClose() {
      this.show = false;
    },
    setLocalStorage() {
      this.dialogClose();
      window.localStorage.setItem('show', 'true');
    },
    checkLocalStorage() {
      const isClose = window.localStorage.getItem('show');
      if (isClose) {
        this.show = false;
      } else {
        this.show = true;
      }
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
.select-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
</style>
