<template>
  <el-dialog :title="`强化模拟 - ${row.title}`" :visible="visible" @close="handleCancel" width="80%">
    <section class="dialog-container">
      <!-- 强化类型 -->
      <div class="upgrade-type-button">
        <el-switch v-model="isStrong" active-text="强化特惠" inactive-text="普通强化"></el-switch>
      </div>
      <!-- 强化信息展示 -->
      <el-image :src="$fn.toWebp(row.cover)" :preview-src-list="[$fn.toWebp(row.cover)]" class="dialog-cover"></el-image>
      <div v-if="level < 10">
        <span class="level-info">等级{{ level }} - 等级{{ level + 1 }}</span>
        <span>强化成功几率：{{ success + '%' }}</span>
      </div>
      <div v-else>已满级</div>
      <!-- 强化进度 -->
      <div class="upgrade-progress">
        <el-progress :text-inside="true" :stroke-width="30" :percentage="percent" class="progress" :format="formatText" status="success"></el-progress>
        <div>满祝福值：{{row.info && row.info[level]}}</div>
      </div>
      <!-- 操作按钮 -->
      <div class="upgrade-button">
        <el-button @click="upgrade" :disabled="level === 10">强化</el-button>
      </div>
      <!-- 统计 -->
      <div>您已花费{{money}}个黄金卷轴</div>
    </section>
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
      const base = 2
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
      // 满祝福或超祝福则进阶
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
.dialog-container {
  margin: 0 24px;
}
.dialog-cover {
  margin-top: 16px;
  width: 120px;
  height: 120px;
}
.level-info {
  margin: 16px 16px 0px 0px;
  display: inline-block;
}
.upgrade-progress {
  display: flex;
  line-height: 30px;
  margin: 16px;
}
.progress {
  flex: 1;
  margin-right: 8px;
}
.upgrade-button {
  margin-bottom: 16px;
}
</style>
