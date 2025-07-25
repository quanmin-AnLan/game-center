import Http from '../../services/index'

const baseApi = '/PenguinFight'

const apis = {
  // 武器技能升级数据
  getUpgradeInfo: () => Http.get(`${baseApi}/getUpgradeInfo`),
  // 武器技能基础信息
  getToolInfo: () => Http.get(`${baseApi}/getToolInfo`),
  // 皮肤数据
  getSkinInfo: () => Http.get(`${baseApi}/getSkinInfo`),
  // 举报
  report: (params) => Http.post(`${baseApi}/report`, params),
  // 获取举报列表
  getReportList: () => Http.get(`${baseApi}/getReportList`),
  // 审核举报
  auditReport: (params) => Http.post(`${baseApi}/auditReport`, params),
  // 清空举报
  clearReport: () => Http.get(`${baseApi}/clearReport`),
  // 获取矿山数据
  getMineList: (params) => Http.post(`/ledou/getMineList`, params),
  // 壶中关卡
  attackGuanqia: (params) => Http.post(`/ledou/hu/guanqia`, params),
  // 壶中boss
  attackBoss: (params) => Http.post(`/ledou/hu/boss`, params),
  // 获取壶中信息
  getHuInfo: (params) => Http.post(`/ledou/hu/info`, params),
  // 获取鹅鹅快跑
  getEEKP: (params) => Http.post(`/ledou/eekp`, params),
};

export default apis