<template>
  <div>
    <el-tabs v-model="activeSeason" @tab-click="tabClick" class="tab-container">
      <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item" :name="item">
      </el-tab-pane>
    </el-tabs>
    <div v-loading="loading" :element-loading-text="loadingText">
      <div class="common-title">筛选区</div>
      <section class="search">
        <div class="search-item">
          <div class="search-item-title">英雄种族:</div>
          <div class="operate-item">
            <el-select v-model="raceKey" placeholder="请选择英雄种族">
              <el-option v-for="(item, index) in raceSelectOptions" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="search-item-title">英雄职业:</div>
          <div class="operate-item">
            <el-select v-model="jobKey" placeholder="请选择英雄职业">
              <el-option v-for="(item, index) in jobSelectOptions" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="search-item-title">英雄费用:</div>
          <div class="operate-item">
            <el-select v-model="priceKey" placeholder="请选择英雄费用">
              <el-option v-for="(item, index) in priceSelectOptions" :key="index" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="search-item-title">英雄名称:</div>
          <div class="operate-item">
            <el-input v-model="nameKey" placeholder="请输入英雄名称"></el-input>
          </div>
        </div>
      </section>
      <div class="common-title">点击英雄头像以在队伍中添加/删除该英雄</div>
      <div class="champion-show">
        <div v-for="(item, index) in washChampionData" :key="index" class="champion-item click"
          @click="addChampion(item)" :style="`border: 3px solid ${colorMap[item.price]}; background-color: ${colorMap[item.price]}`">
          <el-tooltip :content="tooltipShow(item)" placement="top">
            <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
          </el-tooltip>
        </div>
      </div>
      <div class="common-title">当前队伍</div>
      <div class="champion-show">
        <div v-for="(item, index) in chooseData" :key="index" class="champion-item click" @click="addChampion(item)"
          :style="`border: 3px solid ${colorMap[item.price]}; background-color: ${colorMap[item.price]}`">
          <el-tooltip :content="tooltipShow(item)" placement="top">
            <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
          </el-tooltip>
        </div>
      </div>
      <div class="common-title">当前羁绊</div>
      <div class="job-show">
        <div class="job-item" v-for="(item, index) in chooseRaceJobData" :key="index">
          <div class="job-item-text" :class="{'job-item-text-active': item.active}">
            {{ item.name }}{{ item.active ? `(${item.active})` : '' }}：
          </div>
          <div class="job-item-num">{{ item.num + '/' + item.level }}</div>
        </div>
      </div>
      <div class="common-title">基于当前队伍智能生成阵容</div>
      <div class="ai-show">
        <div class="ai-operate">
          <div class="ai-operate-item">目标队伍人数：</div>
          <el-input-number v-model="aiNum" :max="10" :min="1" class="ai-operate-item"></el-input-number>
          <el-button @click="aiTeam()" :disabled="loading">{{ aiText }}</el-button>
        </div>
      </div>
      <div class="common-title">推演队伍{{ aiChampionData.length ? `(生成了${aiChampionData.length}个队伍)` : '' }}</div>
      <div style="width: 1200px; margin: 0 auto;">
        <div v-for="(data, i) in aiChampionData" :key="i">
          <el-divider>第{{ Number(i) + 1 }}个结果</el-divider>
          <div style="width: 100%; display: flex; flex-wrap: wrap; margin-top: 8px;">
            <div v-for="(item, index) in data" :key="index" class="champion-item"
              :style="`border: 3px solid ${colorMap[item.price]}; background-color: ${colorMap[item.price]}`">
              <el-tooltip :content="tooltipShow(item)" placement="top">
                <el-image :src="imgStr + item.name" :alt="item.displayName" fit="fill" />
              </el-tooltip>
            </div>
          </div>
          <div style="width: 100%; display: flex; flex-wrap: wrap;">
            <div class="job-item" v-for="(item, index) in aiChampionJobData[i]" :key="index">
              <div class="job-item-text" :class="{ 'job-item-text-active': item.active }">
                {{ item.name }}{{ item.active ? `(${item.active})` : '' }}：
              </div>
              <div class="job-item-num">{{ item.num + '/' + item.level }}</div>
            </div>
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
      priceSelectOptions: [{ label: '全部', value: '' }],
      raceKey: '',
      jobKey: '',
      priceKey: '',
      nameKey: '',
      chooseData: [],
      aiNum: 10,
      aiChampionData: [],
      aiText: '开始推演',
      loadingText: '拼命加载中',
      activeSeason: 'S16',
      tabList: ['S16', 'HB1', 'S15', 'S14', 'S13', 'S12', 'S11', 'S10', 'S9.5', 'S9', 'S8.5', 'S8', 'S7.5', 'S7', 'S6.5', 'S6', 'S5.5', 'S5', 'S4.5', 'S4', 'S3.5', 'S3', 'S2', 'S1'],
      seasonMap: {
        S16: {
          season: '15.24-2025.S16',
          version: ''
        },
        HB1: {
          season: 's1',
          version: ''
        },
        S15: {
          season: '15.15-2025.S15',
          version: ''
        },
        S14: {
          season: '15.7-2025.S14',
          version: ''
        },
        S13: {
          season: '15.6-2025.S13',
          version: ''
        },
        S12: {
          season: '14.22-2024.S12',
          version: ''
        },
        S11: {
          season: '14.14-2024.S11',
          version: ''
        },
        S10: {
          season: '14.5-2024.S10',
          version: ''
        },
        'S9.5': {
          season: '13.22-2023.S9',
          version: ''
        },
        S9: {
          season: '13.17-2023.S9',
          version: ''
        },
        'S8.5': {
          season: '13.11-2023.S8',
          version: ''
        },
        S8: {
          season: '13.5-2023.S8',
          version: ''
        },
        'S7.5': {
          season: '12.22-2022.S7',
          version: ''
        },
        S7: {
          season: '12.16-2022.S7',
          version: ''
        },
        'S6.5': {
          season: '12.10-2022.S6',
          version: ''
        },
        S6: {
          season: '12.2-2022.S6',
          version: ''
        },
        'S5.5': {
          season: '11.21-2021.S5',
          version: ''
        },
        S5: {
          season: '11.14-2021.S5',
          version: ''
        },
        'S4.5': {
          season: '11.8-2021.S4',
          version: ''
        },
        S4: {
          season: '11.1-2021.S4',
          version: ''
        },
        'S3.5': {
          season: '10.18-2020.S3',
          version: ''
        },
        S3: {
          season: '10.12-2020.S3',
          version: ''
        },
        S2: {
          season: '10.5-2020.S2',
          version: ''
        },
        S1: {
          season: '9.21-2019.S1',
          version: ''
        }
      },
      colorMap: {
        1: 'lightgrey',
        2: 'lightgreen',
        3: 'lightblue',
        4: 'purple',
        5: 'gold',
        6: 'gold',
        7: 'gold',
        8: 'gold',
        9: 'gold',
        10: 'gold'
      }
    }
  },
  computed: {
    washChampionData() {
      let result = this.championData
      if (this.jobKey) {
        result = result.filter(item => item.jobs && item.jobs.includes(this.jobKey))
      }
      if (this.raceKey) {
        result = result.filter(item => item.races && item.races.includes(this.raceKey))
      }
      if (this.priceKey) {
        result = result.filter(item => Number(item.price) === this.priceKey)
      }
      if (this.nameKey) {
        result = result.filter(item => item.displayName && item.displayName.includes(this.nameKey))
      }
      return result
    },
    chooseRaceJobData() {
      const result = []
      for (const item of this.chooseData) {
        const jobArr = (item.jobs && item.jobs.split(',').filter(s => s.trim())) || []
        const raceArr = (item.races && item.races.split(',').filter(s => s.trim())) || []
        const arr = jobArr.concat(raceArr)
        const findData = this.jobData.concat(this.raceData)
        for (const i of arr) {
          if (!i || !i.trim()) continue // 跳过空字符串
          const findItem = findData.find(item => item.name === i)
          if (!findItem || !findItem.level) continue // 跳过未找到或无效的项
          const resultJobItem = result.find(item => item.name === i)
          if (resultJobItem) {
            resultJobItem.num++
            for (const j in findItem.level) {
              if (resultJobItem.num >= Number(findItem.level[Number(j)])) {
                if (findItem.level[Number(j) + 1]) {
                  resultJobItem.level = findItem.level[Number(j) + 1]
                }
                resultJobItem.active = findItem.level[Number(j)]
              }
            }
          } else {
            result.push({
              name: i,
              num: 1,
              level: findItem.level[0] !== '1' ? findItem.level[0] : (findItem.level[1] ? findItem.level[1] : 1),
              active: findItem.level[0] !== '1' ? 0 : 1
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
          const jobArr = (item.jobs && item.jobs.split(',').filter(s => s.trim())) || []
          const raceArr = (item.races && item.races.split(',').filter(s => s.trim())) || []
          const arr = jobArr.concat(raceArr)
          const findData = this.jobData.concat(this.raceData)
          for (const i of arr) {
            if (!i || !i.trim()) continue // 跳过空字符串
            const findItem = findData.find(item => item.name === i)
            if (!findItem || !findItem.level) continue // 跳过未找到或无效的项
            const resultJobItem = res.find(item => item.name === i)
            if (resultJobItem) {
              resultJobItem.num++
              for (const j in findItem.level) {
                if (resultJobItem.num >= Number(findItem.level[Number(j)])) {
                  if (findItem.level[Number(j) + 1]) {
                    resultJobItem.level = findItem.level[Number(j) + 1]
                  }
                  resultJobItem.active = findItem.level[Number(j)]
                }
              }
            } else {
              res.push({
                name: i,
                num: 1,
                level: findItem.level[0] !== '1' ? findItem.level[0] : (findItem.level[1] ? findItem.level[1] : 1),
                active: findItem.level[0] !== '1' ? 0 : 1
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
    tabClick (tab) {
      Object.assign(this.$data, this.$options.data.call(this))
      this.activeSeason = tab.name
      this.loading = true
      this.init()
    },
    async init() {
      try {
        const apiMap = {
          HB: {
            champion: apis.getHBZZChampionData,
            race: apis.getHBZZRaceData,
            job: apis.getHBZZJobData
          },
          S: {
            champion: apis.getTFTChampionData,
            race: apis.getTFTRaceData,
            job: apis.getTFTJobData
          }
        }
        const type = this.activeSeason.includes('HB') ? 'HB' : 'S'
        if (type === 'HB') {
          this.imgStr = 'https://act-webstatic.mihoyo.com/darkmatter/hkrpg/prod_gf_cn/item_icon_u069sd'
        } else {
          this.imgStr = 'https://game.gtimg.cn/images/lol/act/img/tft/champions/'
        }
        const season = this.seasonMap[this.activeSeason].season
        const version = this.seasonMap[this.activeSeason].version
        const championData = await apiMap[type].champion(season, version)
        const filterChampionData = championData.filter(item => item.jobs !== '召唤物' && (item.jobs || item.races))
        this.championData = filterChampionData.map(item => {
          return {
            name: item.name,
            displayName: item.displayName,
            jobs: item.jobs,
            races: item.races,
            price: item.price
          }
        })
        const raceData = await apiMap[type].race(season, version)
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
        const jobData = await apiMap[type].job(season, version)
        this.jobData = jobData.map(item => {
          if (item.name === '剑士' && this.activeSeason === 'S1') {
            item.level = {
              3: '',
              6: '',
              9: ''
            }
          }
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
        for (let i = 1; i < 11; i++) {
          this.priceSelectOptions.push({
            value: i,
            label: i
          })
        }
        this.loading = false
      } catch (err) {
        this.loading = false
        console.log(err)
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
    sleep (time) {
      return new Promise(res => {
        setTimeout(res, time)
      })
    },
    async aiTeam() {
      this.loading = true
      this.aiText = '推演中'
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
        const oneResult = { data: [], job: [] }
        const existingTeamsSet = new Set()
        
        for (const index in result.data) {
          const obj = {
            data: result.data[index],
            job: result.job[index],
            idx: Number(index),
            total: result.data.length,
            price: 5
          }
          const { data, job } = await this.loop(obj, oldJobs, oneResult.data)
          
          // 在添加到结果前进行去重
          for (let j = 0; j < data.length; j++) {
            const teamKey = data[j].map(c => c.name).sort().join(',')
            if (!existingTeamsSet.has(teamKey)) {
              existingTeamsSet.add(teamKey)
              oneResult.data.push(data[j])
              oneResult.job.push(job[j])
            }
          }
          // 每处理完一个队伍组合后，让浏览器有时间响应
          await this.sleep(1)
        }
        if (oneResult.data.length === 0) {
          this.$message.error('当前队伍没有可推演的阵容')
          break
        }
        result = oneResult
      }
      
      // 最终去重（使用更高效的 Set 方法）
      this.loadingText = '正在加载数据中，请耐心等待'
      const finalSet = new Set()
      const finalData = []
      const finalJobData = []
      
      for (let i = 0; i < result.data.length; i++) {
        const key = result.data[i].map(c => c.name).sort().join(',')
        if (!finalSet.has(key)) {
          finalSet.add(key)
          finalData.push(result.data[i])
          finalJobData.push(result.job[i])
        }
      }
      
      this.aiChampionData = finalData
      // 注意：job 数据会在 computed 属性 aiChampionJobData 中重新计算，这里不需要保存
      this.loading = false
      this.aiText = '开始推演'
    },
    async loop(tempData, oldJobs, allData) {
      // 预处理：创建快速查找的 Map 结构
      const findDataMap = new Map()
      const allFindData = this.jobData.concat(this.raceData)
      for (const item of allFindData) {
        findDataMap.set(item.name, item)
      }

      // 预处理：创建已选英雄的 Set，用于快速判断
      const selectedChampionNames = new Set(tempData.data.map(v => v.name))
      
      // 预处理：创建已存在队伍的快速查找 Set（使用字符串 key）
      const existingTeamsSet = new Set()
      for (const team of allData) {
        const teamKey = team.map(c => c.name).sort().join(',')
        existingTeamsSet.add(teamKey)
      }

      // 过滤可用的英雄
      const data = []
      for (const v of this.championData) {
        if (!selectedChampionNames.has(v.name) && tempData.price >= Number(v.price)) {
          data.push(v)
        }
      }

      const newData = []
      const newJobs = []
      let index = 1

      for (const item of data) {
        this.loadingText = `${tempData.data.length}人口有${tempData.total}队，正在推演基于第${tempData.idx + 1}队的${tempData.data.length + 1}人口的第${index}种可能性`

        // 预处理英雄的羁绊数组
        const jobArr = item.jobs ? item.jobs.split(',').filter(s => s.trim()) : []
        const raceArr = item.races ? item.races.split(',').filter(s => s.trim()) : []
        const arr = jobArr.concat(raceArr)

        let tempResult = false
        let tempJobsMap = new Map()
        const tempDataJob = []
        
        // 使用 Map 快速创建 tempDataJob 的副本
        const tempDataJobMap = new Map()
        for (const job of tempData.job) {
          const jobCopy = {
            name: job.name,
            num: Number(job.num),
            level: Number(job.level),
            active: Number(job.active)
          }
          tempDataJobMap.set(job.name, jobCopy)
          tempDataJob.push(jobCopy)
        }

        // 检查是否有未达到最大值的羁绊
        let jobCheckNoMax = true
        for (const job of oldJobs) {
          const searchItem = tempDataJobMap.get(job.name)
          if (!searchItem) continue

          const findItem = findDataMap.get(job.name)
          if (!findItem) continue

          const len = findItem.level.length
          const maxNum = findItem.level[len - 1]
          if (searchItem.num < maxNum) {
            jobCheckNoMax = false
          }
          if (searchItem.num <= maxNum) {
            tempJobsMap.set(job.name, {
              name: job.name,
              num: searchItem.num,
              level: searchItem.level,
              active: searchItem.active
            })
          }
        }
        if (jobCheckNoMax) {
          tempJobsMap = new Map()
          for (const job of tempDataJob) {
            tempJobsMap.set(job.name, {
              name: job.name,
              num: job.num,
              level: job.level,
              active: job.active
            })
          }
        }

        // 处理新英雄的羁绊
        for (const i of arr) {
          if (!i || !i.trim()) continue // 跳过空字符串
          const findItem = findDataMap.get(i)
          if (!findItem || !findItem.level) continue // 跳过未找到或无效的项
          
          const resultJobItem = tempJobsMap.get(i)
          const searchJobItem = tempDataJobMap.get(i)
          
          if (resultJobItem && searchJobItem) {
            searchJobItem.num++
            const levelArray = findItem.level
            
            if (jobCheckNoMax) {
              for (let j = 0; j < levelArray.length; j++) {
                if (searchJobItem.num === Number(levelArray[j])) {
                  if (levelArray[j + 1]) {
                    const nextLevel = Number(levelArray[j + 1])
                    const maxLevel = Number(levelArray[levelArray.length - 1])
                    // 晋级1个羁绊
                    if (nextLevel >= searchJobItem.level && maxLevel >= searchJobItem.num && searchJobItem.name !== '圣灵使者') {
                      tempResult = true
                    }
                    searchJobItem.level = nextLevel
                  }
                  searchJobItem.active = Number(levelArray[j])
                  break
                }
              }
            } else {
              for (let j = 0; j < levelArray.length - 1; j++) {
                const nextLevel = Number(levelArray[j + 1])
                const currentLevel = Number(levelArray[j])
                const maxLevel = Number(levelArray[levelArray.length - 1])
                // 晋级1个羁绊
                if (nextLevel >= searchJobItem.level && maxLevel >= searchJobItem.num && searchJobItem.name !== '圣灵使者') {
                  tempResult = true
                }
                if (searchJobItem.num >= currentLevel) {
                  searchJobItem.level = nextLevel
                  searchJobItem.active = currentLevel
                }
                if (searchJobItem.num < Number(levelArray[0])) {
                  searchJobItem.level = Number(levelArray[0])
                  searchJobItem.active = 0
                }
              }
            }
          } else {
            if (searchJobItem) {
              searchJobItem.num++
              const levelArray = findItem.level
              for (let j = 0; j < levelArray.length; j++) {
                if (searchJobItem.num === Number(levelArray[j])) {
                  if (levelArray[j + 1]) {
                    searchJobItem.level = Number(levelArray[j + 1])
                  }
                  searchJobItem.active = Number(levelArray[j])
                  break
                }
              }
            } else {
              const newJob = {
                name: i,
                num: 1,
                level: findItem.level[0] !== '1' ? Number(findItem.level[0]) : (findItem.level[1] ? Number(findItem.level[1]) : 1),
                active: findItem.level[0] !== '1' ? 0 : 1
              }
              tempDataJobMap.set(i, newJob)
              tempDataJob.push(newJob)
            }
          }
        }
        
        if (tempResult) {
          const baseData = [...tempData.data, item]
          // 使用 Set 进行快速去重检查
          const teamKey = baseData.map(c => c.name).sort().join(',')
          if (!existingTeamsSet.has(teamKey)) {
            existingTeamsSet.add(teamKey)
            newData.push(baseData)
            // 将 Map 转换为数组
            newJobs.push(Array.from(tempDataJobMap.values()))
            index++
          }
        }
      }
      return { data: newData, job: newJobs }
    },
    // 判断两个对象是否相等
    areObjectsEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      if (keys1.length !== keys2.length) return false;
      return keys1.every(key => Object.hasOwnProperty.call(obj2, key) && obj1[key] === obj2[key]);
    },
    // 判断两个数组是否包含相同的对象（顺序无关）
    arraysContainSameObjects(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const arr2Copy = [...arr2];
        for (const obj1 of arr1) {
            const index = arr2Copy.findIndex(obj2 => this.areObjectsEqual(obj1, obj2));
            if (index === -1) return false;
            arr2Copy.splice(index, 1); // 移除已匹配项，避免重复
        }
        return true;
    },
    tooltipShow(item) {
      return `${item.displayName},¥${item.price},${item.jobs},${item.races}`
    }
  }
}
</script>

<style lang="less" scoped>
.tab-container {
  width: 1200px;
  margin: 0 auto;
}
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
      margin-right: 8px;
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
    // height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 0;
    box-sizing: border-box;
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
    .job-item-text-active {
      color: blue;
    }
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
