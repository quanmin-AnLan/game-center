import Http from '../../services/index'

const apis = {
  // 获取LOL英雄数据
  getLOLChampionData: () =>
    Http.get(
      `https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js`
    ),
  // 获取TFT英雄数据
  getTFTChampionData: (season, version) =>
    Http.get(
      `https://game.gtimg.cn/images/lol/act/img/tft/js/${season}/chess${version}.js`
    ),
  // 获取TFT种族数据
  getTFTRaceData: (season, version) =>
    Http.get(
      `https://game.gtimg.cn/images/lol/act/img/tft/js/${season}/race${version}.js`
    ),
  // 获取TFT职业数据
  getTFTJobData: (season, version) =>
    Http.get(
      `https://game.gtimg.cn/images/lol/act/img/tft/js/${season}/job${version}.js`
    ),
};

export default apis