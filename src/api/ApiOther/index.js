import Http from '../../services/index'

const apis = {
  // 获取LOL英雄数据
  getLOLChampionData: () => Http.get(`https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js`),
}

export default apis