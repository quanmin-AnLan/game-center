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
      <section v-if="filterTraitList.length" class="trait-info">
        <div v-for="(trait, index) in filterTraitList" :key="index" class="trait-info-item">
          <div class="trait-info-header">
            <span class="trait-info-type">{{ trait.type }}</span>
            <span class="trait-info-name">{{ trait.name }}</span>
          </div>
          <div v-if="trait.introduce" class="trait-info-introduce" v-html="formatDescription(trait.introduce)"></div>
          <div v-if="trait.levelList.length" class="trait-info-levels">
            <div v-for="(levelItem, levelIndex) in trait.levelList" :key="levelIndex" class="trait-info-level-item" v-html="formatDescription(levelItem)"></div>
          </div>
        </div>
      </section>
      <div class="common-title">点击英雄头像以在队伍中添加/删除该英雄，悬停查看技能效果</div>
      <div class="champion-show">
        <champion-item
          v-for="(item, index) in washChampionData"
          :key="index"
          :item="item"
          :img-str="imgStr"
          :color-map="colorMap"
          clickable
          @toggle="addChampion"
        />
      </div>
      <div class="common-title">当前队伍</div>
      <div class="champion-show">
        <champion-item
          v-for="(item, index) in chooseData"
          :key="index"
          :item="item"
          :img-str="imgStr"
          :color-map="colorMap"
          clickable
          @toggle="addChampion"
        />
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
          <el-button type="primary" @click="startSimulate">开始推演</el-button>
        </div>
      </div>
      <div class="common-title">推演队伍{{ aiChampionData.length ? `(生成了${aiChampionData.length}个队伍)` : '' }}</div>
      <div style="width: 1200px; margin: 0 auto;">
        <div v-for="(data, i) in aiChampionData" :key="i">
          <el-divider>第{{ Number(i) + 1 }}个结果</el-divider>
          <div style="width: 100%; display: flex; flex-wrap: wrap; margin-top: 8px;">
            <champion-item
              v-for="(item, index) in data"
              :key="index"
              :item="item"
              :img-str="imgStr"
              :color-map="colorMap"
            />
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

    <el-dialog
      title="阵容推演"
      :visible.sync="simulateDialogVisible"
      width="920px"
      :close-on-click-modal="false"
      @close="resetSimulate"
    >
      <div class="simulate-section">
        <div class="simulate-subtitle">当前阵容（{{ simulateTeam.length }}人口）</div>
        <div class="champion-show simulate-champion-show">
          <champion-item
            v-for="(item, index) in simulateTeam"
            :key="'team-' + index"
            :item="item"
            :img-str="imgStr"
            :color-map="colorMap"
          />
        </div>
        <div class="job-show simulate-job-show">
          <div class="job-item" v-for="(item, index) in simulateTeamRaceJobData" :key="'trait-' + index">
            <div class="job-item-text" :class="{ 'job-item-text-active': item.active }">
              {{ item.name }}{{ item.active ? `(${item.active})` : '' }}：
            </div>
            <div class="job-item-num">{{ item.num + '/' + item.level }}</div>
          </div>
        </div>
      </div>

      <div v-if="simulateStep === 'pick'" class="simulate-section">
        <div class="simulate-subtitle">请选择第 {{ simulateTeam.length + 1 }} 人口英雄（悬停查看羁绊变化）</div>
        <div v-if="simulateCandidateGroups.length" class="simulate-candidate-groups">
          <div
            v-for="group in simulateCandidateGroups"
            :key="group.key"
            class="simulate-candidate-group"
          >
            <div class="simulate-group-title" :class="'simulate-group-title-' + group.type">
              {{ group.label }}
            </div>
            <div class="champion-show simulate-champion-show">
              <champion-item
                v-for="item in group.champions"
                :key="group.key + '-' + item.name"
                :item="item"
                :img-str="imgStr"
                :color-map="colorMap"
                clickable
                :hover-html="getTraitPreviewHtml(item)"
                @toggle="onPickCandidate"
              />
            </div>
          </div>
        </div>
        <div v-else class="simulate-empty">暂无可选英雄</div>
      </div>

      <div class="simulate-actions">
        <el-button v-if="canUndoSimulate" @click="onUndoSimulate">返回上一步</el-button>
        <el-button v-if="simulateStep === 'pause'" @click="onContinueSimulate">继续推演</el-button>
        <el-button type="primary" @click="onFinishSimulate">结束推演</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import apis from '@/api'
import ChampionItem from './components/ChampionItem.vue'
import { formatDescription } from './utils/formatDescription'

export default {
  name: 'TFTTools',
  components: {
    ChampionItem
  },
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
      aiChampionData: [],
      simulateDialogVisible: false,
      simulateTeam: [],
      simulateHistory: [],
      simulateStep: 'pick',
      loadingText: '拼命加载中',
      activeSeason: 'S18',
      tabList: ['S18', 'S17', 'S16', 'HB1', 'S15', 'S14', 'S13', 'S12', 'S11', 'S10', 'S9.5', 'S9', 'S8.5', 'S8', 'S7.5', 'S7', 'S6.5', 'S6', 'S5.5', 'S5', 'S4.5', 'S4', 'S3.5', 'S3', 'S2', 'S1'],
      seasonMap: {
        S18: {
          season: '16.17-2026.S18',
          version: ''
        },
        S17: {
          season: '16.8-2026.S17',
          version: ''
        },
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
    filterTraitList() {
      const list = []
      if (this.raceKey) {
        const race = this.raceData.find(item => item.name === this.raceKey)
        if (race) {
          list.push(this.buildTraitInfo(race, '种族'))
        }
      }
      if (this.jobKey) {
        const job = this.jobData.find(item => item.name === this.jobKey)
        if (job) {
          list.push(this.buildTraitInfo(job, '职业'))
        }
      }
      return list
    },
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
      return this.computeRaceJobData(this.chooseData)
    },
    simulateTeamRaceJobData() {
      return this.computeRaceJobData(this.simulateTeam)
    },
    canUndoSimulate() {
      return this.simulateHistory.length > 1
    },
    simulateCandidateGroups() {
      if (!this.simulateDialogVisible || this.simulateStep !== 'pick') {
        return []
      }
      const team = this.simulateTeam
      const selected = new Set(team.map(item => item.name))
      const candidates = this.championData.filter(item => {
        return !selected.has(item.name) && this.candidateAffectsExistingTraits(team, item)
      })
      const groupMap = new Map()
      for (const champion of candidates) {
        const categories = this.getCandidateTraitCategories(team, champion)
        for (const category of categories) {
          if (!groupMap.has(category.key)) {
            groupMap.set(category.key, {
              ...category,
              champions: []
            })
          }
          groupMap.get(category.key).champions.push(champion)
        }
      }
      const groups = Array.from(groupMap.values())
      groups.forEach(group => {
        group.champions = this.sortSimulateCandidates(group.champions)
      })
      return groups.sort((a, b) => this.compareCandidateGroups(a, b, team))
    },
    aiChampionJobData() {
      return this.aiChampionData.map(team => this.computeRaceJobData(team))
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
            price: item.price,
            skillName: item.skillName || '',
            skillIntroduce: item.skillIntroduce || '',
            skillImage: item.skillImage || ''
          }
        })
        const raceData = await apiMap[type].race(season, version)
        this.raceData = raceData.map(item => {
          return {
            name: item.name,
            level: Object.keys(item.level),
            introduce: item.introduce || '',
            levelDesc: item.level || {}
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
            level: Object.keys(item.level),
            introduce: item.introduce || '',
            levelDesc: item.level || {}
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
    computeRaceJobData(champions) {
      const result = []
      const findData = this.jobData.concat(this.raceData)
      for (const item of champions) {
        const jobArr = (item.jobs && item.jobs.split(',').filter(s => s.trim())) || []
        const raceArr = (item.races && item.races.split(',').filter(s => s.trim())) || []
        const arr = jobArr.concat(raceArr)
        for (const i of arr) {
          if (!i || !i.trim()) continue
          const findItem = findData.find(trait => trait.name === i)
          if (!findItem || !findItem.level) continue
          const resultJobItem = result.find(trait => trait.name === i)
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
    getChampionTraits(champion) {
      const jobArr = (champion.jobs && champion.jobs.split(',').filter(s => s.trim())) || []
      const raceArr = (champion.races && champion.races.split(',').filter(s => s.trim())) || []
      return jobArr.concat(raceArr)
    },
    formatTraitState(trait) {
      if (!trait) return '无'
      const activeText = trait.active ? `(${trait.active})` : ''
      return `${trait.num}/${trait.level}${activeText}`
    },
    getCandidateTraitCategories(team, champion) {
      const before = this.computeRaceJobData(team)
      const after = this.computeRaceJobData(team.concat(champion))
      const beforeMap = new Map(before.map(item => [item.name, item]))
      const existingNames = new Set(before.map(item => item.name))
      const categories = []
      for (const item of after) {
        if (!existingNames.has(item.name)) continue
        const prev = beforeMap.get(item.name)
        const prevActive = Number(prev?.active || 0)
        const nextActive = Number(item.active || 0)
        if (nextActive > prevActive) {
          categories.push({
            type: '开',
            traitName: item.name,
            value: nextActive,
            label: `开${nextActive}${item.name}`,
            key: `开-${item.name}-${nextActive}`
          })
        } else if (item.num > (prev?.num || 0)) {
          categories.push({
            type: '凑',
            traitName: item.name,
            value: item.num,
            label: `凑${item.num}${item.name}`,
            key: `凑-${item.name}-${item.num}`
          })
        }
      }
      return categories
    },
    compareCandidateGroups(a, b, team) {
      if (a.type !== b.type) {
        return a.type === '开' ? -1 : 1
      }
      const topTraits = new Set(this.getTopTraitNames(team))
      const aTop = topTraits.has(a.traitName) ? 1 : 0
      const bTop = topTraits.has(b.traitName) ? 1 : 0
      if (bTop !== aTop) {
        return bTop - aTop
      }
      if (b.value !== a.value) {
        return b.value - a.value
      }
      return a.traitName.localeCompare(b.traitName, 'zh-CN')
    },
    getTraitChanges(team, champion) {
      const before = this.computeRaceJobData(team)
      const after = this.computeRaceJobData(team.concat(champion))
      const beforeMap = new Map(before.map(item => [item.name, item]))
      const changes = []
      for (const item of after) {
        const prev = beforeMap.get(item.name)
        const beforeText = this.formatTraitState(prev)
        const afterText = this.formatTraitState(item)
        if (beforeText !== afterText) {
          changes.push({
            name: item.name,
            beforeText,
            afterText
          })
        }
      }
      return changes
    },
    candidateAffectsExistingTraits(team, champion) {
      const existingNames = new Set(this.computeRaceJobData(team).map(item => item.name))
      if (!existingNames.size) {
        return true
      }
      return this.getTraitChanges(team, champion).some(change => existingNames.has(change.name))
    },
    canUnlockNextTrait(team, champion) {
      const before = this.computeRaceJobData(team)
      const after = this.computeRaceJobData(team.concat(champion))
      const beforeMap = new Map(before.map(item => [item.name, item]))
      for (const item of after) {
        const prev = beforeMap.get(item.name)
        if (!prev) {
          if (Number(item.active) > 0) return true
          continue
        }
        if (Number(item.active) > Number(prev.active)) {
          return true
        }
      }
      return false
    },
    getTopTraitNames(team) {
      const traits = this.computeRaceJobData(team)
      if (!traits.length) return []
      const maxNum = Math.max(...traits.map(item => item.num))
      if (!maxNum) return []
      return traits.filter(item => item.num === maxNum).map(item => item.name)
    },
    getCandidateSortScore(team, champion) {
      const unlock = this.canUnlockNextTrait(team, champion) ? 1 : 0
      const topTraits = this.getTopTraitNames(team)
      const championTraits = this.getChampionTraits(champion)
      const sameTrait = championTraits.filter(name => topTraits.includes(name)).length
      return { unlock, sameTrait }
    },
    sortSimulateCandidates(candidates) {
      const team = this.simulateTeam
      return candidates.slice().sort((a, b) => {
        const scoreA = this.getCandidateSortScore(team, a)
        const scoreB = this.getCandidateSortScore(team, b)
        if (scoreB.unlock !== scoreA.unlock) {
          return scoreB.unlock - scoreA.unlock
        }
        if (scoreB.sameTrait !== scoreA.sameTrait) {
          return scoreB.sameTrait - scoreA.sameTrait
        }
        if (Number(a.price) !== Number(b.price)) {
          return Number(a.price) - Number(b.price)
        }
        return (a.displayName || '').localeCompare(b.displayName || '', 'zh-CN')
      })
    },
    getTraitPreviewHtml(champion) {
      const changes = this.getTraitChanges(this.simulateTeam, champion)
      if (!changes.length) {
        return '<div class="trait-preview-title">羁绊变化预览</div><div class="trait-preview-empty">羁绊无变化</div>'
      }
      const lines = changes.map(item => (
        `<div class="trait-preview-line">${item.name}：${item.beforeText} → ${item.afterText}</div>`
      )).join('')
      return `<div class="trait-preview-title">羁绊变化预览</div>${lines}`
    },
    async confirmAction(message, confirmButtonText = '确定') {
      try {
        await this.$confirm(message, '提示', {
          type: 'warning',
          confirmButtonText,
          cancelButtonText: '取消'
        })
        return true
      } catch (err) {
        return false
      }
    },
    startSimulate() {
      if (!this.chooseData.length) {
        this.$message.warning('请先在当前队伍中选择英雄')
        return
      }
      this.simulateTeam = JSON.parse(JSON.stringify(this.chooseData))
      this.simulateHistory = [JSON.parse(JSON.stringify(this.simulateTeam))]
      this.simulateStep = 'pick'
      this.simulateDialogVisible = true
    },
    resetSimulate() {
      this.simulateTeam = []
      this.simulateHistory = []
      this.simulateStep = 'pick'
    },
    onUndoSimulate() {
      if (!this.canUndoSimulate) {
        this.$message.warning('已经是第一步，无法返回')
        return
      }
      this.simulateHistory.pop()
      this.simulateTeam = JSON.parse(JSON.stringify(this.simulateHistory[this.simulateHistory.length - 1]))
      this.simulateStep = 'pick'
    },
    hasSimulateCandidates() {
      const selected = new Set(this.simulateTeam.map(item => item.name))
      return this.championData.some(item => {
        return !selected.has(item.name) && this.candidateAffectsExistingTraits(this.simulateTeam, item)
      })
    },
    advanceSimulatePick() {
      if (!this.hasSimulateCandidates()) {
        this.$message.warning('没有可选英雄了')
        this.simulateStep = 'pause'
        return false
      }
      this.simulateStep = 'pick'
      return true
    },
    async onPickCandidate(champion) {
      if (this.simulateStep !== 'pick') return
      const currentSize = this.simulateTeam.length + 1
      const price = Number(champion.price)
      const needLowPopulationConfirm = (currentSize <= 4 && price >= 4) || (currentSize <= 7 && price >= 5)
      if (needLowPopulationConfirm) {
        const confirmed = await this.confirmAction(`当前才${currentSize}人口，我觉得你D不到，是否仍要添加该英雄？`, '仍要添加')
        if (!confirmed) return
      }
      this.simulateTeam.push(champion)
      this.simulateHistory.push(JSON.parse(JSON.stringify(this.simulateTeam)))
      if (this.simulateTeam.length >= 10) {
        this.simulateStep = 'pause'
        return
      }
      this.advanceSimulatePick()
    },
    async onContinueSimulate() {
      if (this.simulateTeam.length >= 10) {
        const confirmed = await this.confirmAction(
          `当前人口已达${this.simulateTeam.length}人口，是否仍要继续推演？`,
          '仍要继续'
        )
        if (!confirmed) return
      }
      this.advanceSimulatePick()
    },
    onFinishSimulate() {
      const teamKey = this.simulateTeam.map(item => item.name).sort().join(',')
      const exists = this.aiChampionData.some(team => team.map(item => item.name).sort().join(',') === teamKey)
      if (!exists) {
        this.aiChampionData.push(JSON.parse(JSON.stringify(this.simulateTeam)))
      } else {
        this.$message.info('该阵容已在推演列表中')
      }
      this.simulateDialogVisible = false
      this.resetSimulate()
    },
    buildTraitInfo(trait, type) {
      const levelList = Object.keys(trait.levelDesc || {})
        .sort((a, b) => Number(a) - Number(b))
        .map(key => trait.levelDesc[key])
        .filter(Boolean)
      return {
        type,
        name: trait.name,
        introduce: trait.introduce,
        levelList
      }
    },
    formatDescription
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
.trait-info {
  width: 1200px;
  margin: 0 auto 24px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
  overflow-wrap: break-word;

  .trait-info-item + .trait-info-item {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #dcdfe6;
  }

  .trait-info-header {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
  }

  .trait-info-type {
    margin-right: 8px;
    padding: 2px 8px;
    background: #409eff;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
  }

  .trait-info-introduce {
    margin-bottom: 8px;
    color: #606266;
  }

  .trait-info-level-item {
    padding: 4px 0;
    color: #303133;
  }
}
.champion-show {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
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
  }
}
.simulate-section {
  margin-bottom: 20px;
}
.simulate-subtitle {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #303133;
}
.simulate-champion-show {
  width: 100%;
}
.simulate-job-show {
  width: 100%;
  margin-top: 12px;
}
.simulate-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 8px;
}
.simulate-empty {
  color: #909399;
  font-size: 14px;
}
.simulate-candidate-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.simulate-candidate-group {
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background: #fafafa;
}
.simulate-group-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}
.simulate-group-title-开 {
  color: #e6a23c;
}
.simulate-group-title-凑 {
  color: #409eff;
}
</style>
