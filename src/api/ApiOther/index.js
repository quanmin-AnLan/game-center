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
  // 获取货币战争英雄数据
  getHBZZChampionData: (season) =>
    Http.get(`http://static.wnw.icu/bt/hbzz/${season}/chess.json`),
  // 获取货币战争种族数据
  getHBZZRaceData: (season) =>
    Http.get(`http://static.wnw.icu/bt/hbzz/${season}/race.json`),
  // 获取货币战争职业数据
  getHBZZJobData: (season) =>
    Http.get(`http://static.wnw.icu/bt/hbzz/${season}/job.json`),
};

export default apis