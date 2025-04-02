<template>
  <div v-loading="loading">
    <div class="common-title">筛选区</div>
    <section class="search">
      <div class="search-item">
        <div class="search-item-title">选择英雄种族：</div>
        <div class="operate-item">
          <el-select v-model="raceKey" placeholder="请选择英雄种族">
            <el-option v-for="(item, index) in raceSelectOptions" :key="index" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="search-item-title">选择英雄职业：</div>
        <div class="operate-item">
          <el-select v-model="jobKey" placeholder="请选择英雄职业">
            <el-option v-for="(item, index) in jobSelectOptions" :key="index" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
    </section>
    <div class="common-title">点击英雄头像以在队伍中添加/删除该英雄</div>
    <div class="champion-show">
      <div v-for="(item, index) in washChampionData" :key="index" class="champion-item click"
        @click="addChampion(item)">
        <el-tooltip :content="item.displayName" placement="top">
          <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
        </el-tooltip>
      </div>
    </div>
    <div class="common-title">当前队伍</div>
    <div class="champion-show">
      <div v-for="(item, index) in chooseData" :key="index" class="champion-item">
        <el-tooltip :content="item.displayName" placement="top">
          <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
        </el-tooltip>
      </div>
    </div>
    <div class="common-title">当前羁绊</div>
    <div class="job-show">
      <div class="job-item" v-for="(item, index) in chooseRaceJobData" :key="index">
        <div class="job-item-text">{{ item.name }}：</div>
        <div class="job-item-num">{{ item.num + '/' + item.level }}</div>
      </div>
    </div>
    <div class="common-title">基于当前队伍智能生成阵容</div>
    <div class="ai-show">
      <div class="ai-operate">
        <div class="ai-operate-item">目标队伍人数：</div>
        <el-input-number v-model="aiNum" :max="10" :min="1" class="ai-operate-item"></el-input-number>
        <el-button @click="aiTeam">开始推演</el-button>
      </div>
    </div>
    <div class="common-title">推演队伍</div>
    <div style="width: 1200px; margin: 0 auto;">
      <div v-for="(data, i) in aiChampionData" :key="i">
        <div style="width: 100%; display: flex; flex-wrap: wrap;">
          <div v-for="(item, index) in data" :key="index" class="champion-item">
            <el-tooltip :content="item.displayName" placement="top">
              <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
            </el-tooltip>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-wrap: wrap;">
          <div class="job-item" v-for="(item, index) in aiChampionJobData[i]" :key="index">
            <div class="job-item-text">{{ item.name }}：</div>
            <div class="job-item-num">{{ item.num + '/' + item.level }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apis from '@/api'
export default {
  name: 'TFTTools',
  data() {
    return {
      loading: false,
      imgStr: 'https://game.gtimg.cn/images/lol/act/img/tft/champions/',
      championData: [],
      raceData: [],
      jobData: [],
      raceSelectOptions: [{label: '全部', value: ''}],
      jobSelectOptions: [{ label: '全部', value: '' }],
      raceKey: '',
      jobKey: '',
      chooseData: [],
      aiNum: 10,
      aiChampionData: []
    }
  },
  computed: {
    washChampionData() {
      let result = this.championData
      if (this.jobKey) {
        result = result.filter(item => item.jobs.includes(this.jobKey))
      }
      if (this.raceKey) {
        result = result.filter(item => item.races.includes(this.raceKey))
      }
      return result
    },
    chooseRaceJobData() {
      const result = []
      for (const item of this.chooseData) {
        const jobArr = item.jobs && item.jobs.split(',') || []
        const raceArr = item.races && item.races.split(',') || []
        const arr = jobArr.concat(raceArr)
        const findData = this.jobData.concat(this.raceData)
        for (const i of arr) {
          const findItem = findData.find(item => item.name === i)
          const resultJobItem = result.find(item => item.name === i)
          if (resultJobItem) {
            resultJobItem.num++
            for (const j in findItem.level) {
              if (resultJobItem.num >= findItem.level[j]) {
                if (findItem.level[Number(j + 1)]) {
                  resultJobItem.level = findItem.level[Number(j + 1)]
                }
              }
            }
          } else {
            result.push({
              name: i,
              num: 1,
              level: findItem.level[0] !== '1' ? findItem.level[0] : (findItem.level[1] ? findItem.level[1] : 1)
            })
          }
        }
      }
      return result
    },
    aiChampionJobData() {
      const result = []
      for (const data of this.aiChampionData) {
        const res = []
        for (const item of data) {
          const jobArr = item.jobs && item.jobs.split(',') || []
          const raceArr = item.races && item.races.split(',') || []
          const arr = jobArr.concat(raceArr)
          const findData = this.jobData.concat(this.raceData)
          for (const i of arr) {
            const findItem = findData.find(item => item.name === i)
            const resultJobItem = res.find(item => item.name === i)
            if (resultJobItem) {
              resultJobItem.num++
              for (const j in findItem.level) {
                if (resultJobItem.num >= findItem.level[j]) {
                  if (findItem.level[Number(j + 1)]) {
                    resultJobItem.level = findItem.level[Number(j + 1)]
                  }
                }
              }
            } else {
              res.push({
                name: i,
                num: 1,
                level: findItem.level[0] !== '1' ? findItem.level[0] : (findItem.level[1] ? findItem.level[1] : 1)
              })
            }
          }
        }
        result.push(res)
      }
      return result
    }
  },
  mounted() {
    this.loading = true
    this.init()
  },
  methods: {
    async init() {
      try {
        const championData = await apis.getTFTChampionData()
        const filterChampionData = championData.filter(item => item.jobs !== '召唤物')
        this.championData = filterChampionData.map(item => {
          return {
            name: item.name,
            displayName: item.displayName,
            jobs: item.jobs,
            races: item.races,
            price: item.price
          }
        })
        const raceData = await apis.getTFTRaceData()
        this.raceData = raceData.map(item => {
          return {
            name: item.name,
            level: Object.keys(item.level)
          }
        })
        for (const item of this.raceData) {
          this.raceSelectOptions.push({
            value: item.name,
            label: item.name
          })
        }
        const jobData = await apis.getTFTJobData()
        this.jobData = jobData.map(item => {
          return {
            name: item.name,
            level: Object.keys(item.level)
          }
        })
        for (const item of this.jobData) {
          this.jobSelectOptions.push({
            value: item.name,
            label: item.name
          })
        }
        this.loading = false
      } catch (err) {
        this.loading = false
        this.$message.error('获取官方数据失败，请联系安澜')
      }
    },
    addChampion(item) {
      if (!this.chooseData.includes(item)) {
        this.chooseData.push(item)
      } else {
        const index = this.chooseData.indexOf(item)
        this.chooseData.splice(index, 1)
      }
    },
    aiTeam() {
      if (this.aiNum < this.chooseData.length) {
        this.$message.error('目标人数小于已选队伍人数')
      }
      const oldJobs = JSON.parse(JSON.stringify(this.chooseRaceJobData))
      const oldData = JSON.parse(JSON.stringify(this.chooseData))
      const num = this.aiNum - this.chooseData.length
      let result = {
        data: [oldData],
        job: [oldJobs]
      }
      for (let i = 0; i < num; i++) {
        const oneResult = {data: [], job: []}
        for (const index in result.data) {
          const obj = {
            data: result.data[index],
            job: result.job[index]
          }
          const { data, job } = this.loop(obj)
          oneResult.data.push(...data)
          oneResult.job.push(...job)
        }
        result = oneResult
      }
      this.aiChampionData = result.data
    },
    loop(tempData) {
      const data = this.championData.filter((v) => tempData.data.every((val) => val.name != v.name))
      const newData = []
      const newJobs = []
      for (const item of data) {
        const jobArr = item.jobs && item.jobs.split(',') || []
        const raceArr = item.races && item.races.split(',') || []
        const arr = jobArr.concat(raceArr)
        const findData = this.jobData.concat(this.raceData)
        let tempResult = false
        const tempJobs = JSON.parse(JSON.stringify(tempData.job))
        for (const i of arr) {
          const findItem = findData.find(item => item.name === i)
          const resultJobItem = tempJobs.find(item => item.name === i)
          if (resultJobItem) {
            resultJobItem.num++
            for (const j in findItem.level) {
              if (resultJobItem.num >= findItem.level[j]) {
                if (findItem.level[Number(j + 1)]) {
                  // 晋级1个羁绊
                  if (findItem.level[Number(j + 1)] > resultJobItem.level) {
                    tempResult = true
                  }
                  resultJobItem.level = findItem.level[Number(j + 1)]
                }
              }
            }
          } else {
            tempJobs.push({
              name: i,
              num: 1,
              level: findItem.level[0] !== '1' ? findItem.level[0] : (findItem.level[1] ? findItem.level[1] : 1)
            })
          }
        }
        if (tempResult) {
          const baseData = JSON.parse(JSON.stringify(tempData.data))
          baseData.push(item)
          newData.push(baseData)
          newJobs.push(tempJobs)
        }
      }
      return { data: newData, job: newJobs }
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
    margin-bottom: 8px;

    .operate-item {
      margin: 0 24px;
    }
  }
}
.champion-show {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
  .champion-item {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 0;
    &.click {
      cursor: pointer;
    }
  }
.job-show {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
  .job-item {
    display: flex;
    margin-right: 8px;
    margin-bottom: 8px;
  }
.ai-show {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .ai-operate {
    display: flex;
    align-items: center;
    justify-content: center;
    .ai-operate-item {
      margin-right: 24px;
    }
  }
}
</style>
