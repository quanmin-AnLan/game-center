import Http from '../../services/index'

const apis = {
    // 获取强化数据
    getUpgradeInfo: (params) => Http.get(`/getUpgradeInfo`, params),
    // 获取武器技能信息
    getToolInfo: (params) => Http.get(`/getToolInfo`, params)
}

export default apis
