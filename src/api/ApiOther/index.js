import Http from '../../services/index'

const apis = {
  // 获取LOL英雄数据
  getLOLChampionData: () => Http.get(`https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js`),
  // 获取TFT英雄数据
  getTFTChampionData: () => Http.get(`https://game.gtimg.cn/images/lol/act/img/tft/js/15.7-2025.S14/chess.js`),
  // 获取TFT种族数据
  getTFTRaceData: () => Http.get(`https://game.gtimg.cn/images/lol/act/img/tft/js/15.7-2025.S14/race.js`),
  // 获取TFT职业数据
  getTFTJobData: () => Http.get(`https://game.gtimg.cn/images/lol/act/img/tft/js/15.7-2025.S14/job.js`),
}

export default apis