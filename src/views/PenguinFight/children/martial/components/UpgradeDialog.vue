<template>
  <el-dialog :title="`强化模拟 - ${row.title}`" :visible="visible" @close="handleCancel">
    <div class="upgrade-type-button">
      <el-switch v-model="isStrong" active-text="强化特惠" inactive-text="普通强化"></el-switch>
    </div>
    <div v-if="level < 10">强化成功几率：{{ success + '%' }}</div>
    <div v-else>已满级</div>
    <div class="upgrade-progress">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="percent" class="progress" :format="formatText"></el-progress>
      <div>满祝福值：{{row.info && row.info[level]}}</div>
      <span>等级{{ level }}</span>
      <span v-if="level < 10"> - 等级{{ level + 1 }}</span>
    </div>
    <div class="upgrade-button">
      <el-button @click="upgrade" :disabled="level === 10">强化</el-button>
    </div>
    <div>您已花费{{money}}个黄金卷轴</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpgradeDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      level: 0,
      num: 0,
      percent: 0,
      money: 0,
      isStrong: false
    }
  },
  computed: {
    success() {
      const base = this.isStrong ? 4 : 2
      const result = base * 100 / (this.row.info?.[this.level] + base)
      return Math.round(result)
    }
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
      Object.assign(this.$data, this.$options.data.call(this))
    },
    upgrade() {
      this.money += (this.level + 1)
      const base = this.isStrong ? 4 : 2
      // 满祝福&超祝福则进阶
      if (this.num < this.row.info[this.level]) {
        if (this.num + base > this.row.info[this.level]) {
          this.levelUp()
        } else {
          const random = Math.random() * 100
          if (random <= this.success) {
            this.levelUp()
          } else {
            this.num += base
            this.percent = this.num * 100 / this.row.info[this.level]
          }
        }
      } else {
        this.levelUp()
      }
    },
    levelUp() {
      this.$message.success('升级成功！')
      this.level++
      this.num = 0
      this.percent = 0
    },
    formatText() {
      return this.num
    }
  }
}
</script>

<style lang="less" scoped>

</style>
