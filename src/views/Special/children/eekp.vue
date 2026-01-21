<template>
  <section v-html="text"></section>
</template>

<script>
import apis from '@/api'
export default {
  name: 'SpecialEekp',
  data() {
    return {
      text: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init() {
      const tokenParams = {
        key: 'h5token'
      }
      const token = await apis.getSpecialToken(tokenParams)
      const eekpParams = {
        h5token: token,
        uid: 4620584,
        region: '4',
        h5openid: "oKIwA0Xy90iJ2JSCsuUEPNEq0-NE"
      }
      const eekpHeaders = {
        uuid: "85dcbbaa-4703-4812-8f0c-5aeb5d100674"
      }
      const data = await apis.getEEKP(eekpParams, eekpHeaders)
      const { res1, res2 } = data
      const { winnerid, location } = res1
      const { runner_list } = res2
      const winnerItem = runner_list.find(item => item.id == winnerid)

      // 计算排名：根据距离降序排序，距离越大排名越靠前
      const rankMap = {}
      location
        .map((distance, index) => ({ index, distance }))
        .sort((a, b) => b.distance - a.distance)
        .forEach((item, sortedIndex, sortedArray) => {
          // 如果距离小于前一个，排名为 sortedIndex + 1，否则与前一个排名相同
          const prevItem = sortedArray[sortedIndex - 1]
          const rank = prevItem && item.distance < prevItem.distance
            ? sortedIndex + 1
            : (prevItem ? rankMap[prevItem.index] : 1)
          rankMap[item.index] = rank
        })

      // 生成显示文本
      let domText = `<div>押${winnerid + 1}，倍数为${winnerItem.bet_odds}</div><br />`
      runner_list.forEach((item, i) => {
        domText += `第${i + 1}人${item.bet_odds}倍${item.quality}${item.state}跑了${location[i]}米,排名第${rankMap[i]}<br />`
      })
      this.text = domText
    }
  }
}
</script>

<style lang="less" scoped>

</style>
