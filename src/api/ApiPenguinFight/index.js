import Http from '../../services/index'

const baseApi = '/PenguinFight'

const apis = {
  // 武器技能升级数据
  getUpgradeInfo: () => Http.get(`${baseApi}/getUpgradeInfo`),
  // 武器技能基础信息
  getToolInfo: () => Http.get(`${baseApi}/getToolInfo`),
  // 皮肤数据
  getSkinInfo: () => Http.get(`${baseApi}/getSkinInfo`),
  // 皮肤数据
  getSkin: () => Http.get(`${baseApi}/skin/get`),
  // 皮肤数据
  addSkin: (params) => Http.post(`${baseApi}/skin/add`, params),
  // 举报
  report: (params) => Http.post(`${baseApi}/report`, params),
  // 获取举报列表
  getReportList: () => Http.get(`${baseApi}/getReportList`),
  // 审核举报
  auditReport: (params) => Http.post(`${baseApi}/auditReport`, params),
  // 清空举报
  clearReport: () => Http.get(`${baseApi}/clearReport`)
}

export default apis