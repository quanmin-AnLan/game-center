import Http from '../../services/index'

const baseApi = '/common'

const apis = {
  // 用户列表
  getSpecialToken: (params) => Http.get(`${baseApi}/getCommonStaticConfig`, params),
}

export default apis