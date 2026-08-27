<template>
  <el-popover
    placement="right"
    trigger="hover"
    :open-delay="250"
    width="400"
    popper-class="tft-skill-popover"
  >
    <div class="skill-popover">
      <div class="skill-popover-header">
        <el-image
          v-if="item.skillImage"
          class="skill-popover-icon"
          :src="item.skillImage"
          fit="cover"
        />
        <div class="skill-popover-meta-wrap">
          <div class="skill-popover-name">
            {{ item.displayName }}
            <span class="skill-popover-price">¥{{ item.price }}</span>
          </div>
          <div class="skill-popover-traits">
            {{ item.jobs }}<template v-if="item.jobs && item.races"> · </template>{{ item.races }}
          </div>
          <div v-if="item.skillName" class="skill-popover-skill-name">{{ item.skillName }}</div>
        </div>
      </div>
      <div class="skill-popover-content" v-html="skillIntroduceHtml"></div>
    </div>
    <div
      slot="reference"
      class="champion-item"
      :class="{ click: clickable }"
      :style="borderStyle"
      @click="handleClick"
    >
      <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
    </div>
  </el-popover>
</template>

<script>
import { formatDescription } from '../utils/formatDescription'

export default {
  name: 'ChampionItem',
  props: {
    item: { type: Object, required: true },
    imgStr: { type: String, required: true },
    colorMap: { type: Object, required: true },
    clickable: { type: Boolean, default: false }
  },
  computed: {
    borderStyle() {
      const color = this.colorMap[this.item.price] || 'lightgrey'
      return {
        border: `3px solid ${color}`,
        backgroundColor: color
      }
    },
    skillIntroduceHtml() {
      if (!this.item.skillIntroduce) {
        return '<span class="skill-empty">暂无技能描述</span>'
      }
      return formatDescription(this.item.skillIntroduce)
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('toggle', this.item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.champion-item {
  width: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 0;
  box-sizing: border-box;

  &.click {
    cursor: pointer;
  }
}
</style>

<style lang="less">
.tft-skill-popover {
  max-height: 420px;
  overflow-y: auto;
  line-height: 1.6;
  font-size: 13px;
  color: #303133;
  word-break: break-word;
  overflow-wrap: break-word;

  .skill-popover-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ebeef5;
  }

  .skill-popover-icon {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .skill-popover-meta-wrap {
    flex: 1;
    min-width: 0;
  }

  .skill-popover-name {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .skill-popover-price {
    margin-left: 8px;
    font-size: 13px;
    font-weight: normal;
    color: #e6a23c;
  }

  .skill-popover-traits {
    font-size: 12px;
    color: #909399;
    margin-bottom: 4px;
  }

  .skill-popover-skill-name {
    font-size: 13px;
    color: #409eff;
    font-weight: 500;
  }

  .skill-popover-content {
    color: #606266;
    word-break: break-word;

    bright, Bright {
      color: #e6a23c;
      font-weight: 500;
    }

    dim {
      color: #909399;
    }

    keyword, Keyword {
      color: #409eff;
    }

    rules, Rules {
      color: #909399;
      font-size: 12px;
    }
  }

  .skill-empty {
    color: #c0c4cc;
  }
}
</style>
