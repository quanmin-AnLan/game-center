<template>
  <div v-loading="loading">
    <div class="common-title">操作区</div>
    <section class="search">
      <div class="search-item">
        <div class="search-item-title">设置英雄分类：</div>
        <el-radio-group v-model="jobRadio">
          <el-radio :label="0">自选</el-radio>
          <el-radio :label="1">随机</el-radio>
        </el-radio-group>
        <div class="operate-item">
          <el-select v-if="jobRadio === 0" v-model="jobKey" placeholder="请选择英雄分类">
            <el-option v-for="(item, index) in hero_job" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
          <el-button v-if="jobRadio === 1" @click="randomJob">开始随机</el-button>
        </div>
      </div>
      <div class="search-item">
        <div class="search-item-title">设置英雄位置：</div>
        <el-radio-group v-model="posRadio">
          <el-radio :label="0">自选</el-radio>
          <el-radio :label="1">随机</el-radio>
        </el-radio-group>
        <div class="operate-item">
          <el-select v-if="posRadio === 0" v-model="posKey" placeholder="请选择英雄位置">
            <el-option v-for="(item, index) in hero_pos" :key="index" :label="item.name" :value="item.type"></el-option>
          </el-select>
          <el-button v-if="posRadio === 1" @click="randomPos">开始随机</el-button>
        </div>
      </div>
      <div class="search-item">
        <div class="search-item-title">设置随机次数：</div>
        <el-input-number :min="1" v-model="randomTimes"></el-input-number>
      </div>
      <div class="search-item">
        <el-button @click="getTableData">开始随机{{ randomTimes }}次</el-button>
        <el-button @click="tableData = []">清空</el-button>
      </div>
    </section>
    <div class="common-title">展示区</div>
    <section class="search show">
      <div class="search-item">
        <div class="search-item-title">当前选择的英雄分类：</div>
        <div class="search-item-desc">{{ hero_job.find(item => item.type === jobKey).name }}</div>
      </div>
      <div class="search-item">
        <div class="search-item-title">当前选择的英雄位置：</div>
        <div class="search-item-desc">{{ hero_pos.find(item => item.type === posKey).name }}</div>
      </div>
      <div class="search-item">
        <div class="search-item-title">当前筛选的英雄个数：</div>
        <div class="search-item-desc">{{ poolData.length }}</div>
      </div>
    </section>
    <section class="table">
      <al-table :tableData="tableData" :headerSet="headerSet"></al-table>
    </section>
  </div>
</template>

<script>
import apis from '@/api'
export default {
  name: 'LOLTools',
  data() {
    return {
      posData: {},
      loading: false,
      commonData: [],
      finallyData: [],
      jobRadio: 0,
      posRadio: 0,
      hero_job: [
        { type: '', name: '全部' },
        { type: 'fighter', name: '战士' },
        { type: 'mage', name: '法师' },
        { type: 'assassin', name: '刺客' },
        { type: 'tank', name: '坦克' },
        { type: 'marksman', name: '射手' },
        { type: 'support', name: '辅助' }
      ],
      hero_pos: [
        { type: '', name: '全部' },
        { type: 'top', name: '上单' },
        { type: 'jungle', name: '打野' },
        { type: 'mid', name: '中路' },
        { type: 'bottom', name: '下路' },
        { type: 'support', name: '辅助' }
      ],
      jobKey: '',
      posKey: '',
      tableData: [],
      headerSet: [
        {
          prop: 'name',
          label: '英雄名'
        },
        {
          prop: 'roles',
          label: '英雄分类'
        },
        {
          prop: 'pos',
          label: '英雄定位'
        },
        {
          prop: 'times',
          label: '出现次数',
          sortable: true
        },
      ],
      randomTimes: 1
    }
  },
  mounted() {
    this.loading = true
    this.$fn.addJs('https://lol.qq.com/act/lbp/common/guides/guideschampion_position.js', this.cb)
  },
  computed: {
    poolData() {
      const result = this.finallyData.filter(item => {
        if (this.jobKey && this.posKey) {
          return item.roles.includes(this.jobKey) && item.pos.includes(this.posKey)
        } else if (this.jobKey) {
          return item.roles.includes(this.jobKey)
        } else if (this.posKey) {
          return item.pos.includes(this.posKey)
        } else {
          return true
        }
      })
      return result
    }
  },
  watch: {
    jobRadio() {
      this.jobKey = ''
    },
    posRadio() {
      this.posKey = ''
    }
  },
  methods: {
    cb() {
      this.loading = false
      const { list } = window.CHAMPION_POSITION
      this.posData = list
      this.init()
    },
    async init() {
      const data = await apis.getLOLChampionData()
      const { hero } = data
      this.commonData = hero
      this.washData()
    },
    washData() {
      this.finallyData = this.commonData.map(item => {
        const { title, roles, heroId } = item
        const data = this.posData[heroId] || {}
        const pos = Object.keys(data)
        return {
          title,
          roles,
          pos
        }
      })
    },
    randomJob() {
      const index = Math.floor(Math.random() * this.hero_job.length)
      this.jobKey = this.hero_job[index].type
    },
    randomPos() {
      const index = Math.floor(Math.random() * this.hero_pos.length)
      this.posKey = this.hero_pos[index].type
    },
    getTableData() {
      for (let i = 0; i < this.randomTimes; i++) {
        const index = Math.floor(Math.random() * this.poolData.length)
        const item = this.poolData[index]
        const findIndex = this.tableData.findIndex(i => i.name === item.title)
        if (findIndex === -1) {
          this.tableData.push({
            name: item.title,
            roles: item.roles.map(i => {
              return this.hero_job.find(j => j.type === i).name
            }).join('、'),
            pos: item.pos.map(i => {
              return this.hero_pos.find(j => j.type === i).name
            }).join('、'),
            times: 1
          })
        } else {
          this.tableData[findIndex].times++
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-title {
  font-size: 18px;
  margin-bottom: 36px;
}
.search {
  width: 1200px;
  margin: 0 auto;
  font-size: 16px;
  .search-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    .operate-item {
      margin-left: 24px;
    }
  }
}
.show {
  display: flex;
  align-items: center;
  .search-item {
    margin-right: 12px;
    .search-item-desc {
      color: red;
    }
  }
}
.table {
  width: 1200px;
  margin: 0 auto;
}
</style>
