import Http from '../../services/index'

const apis = {
  // 上传接口
  getQiniuToken: (params) => Http.post(`http://data.anlan.xyz/upload`, params),
  // pv上报
  reportPV: (params) => Http.get(`http://data.anlan.xyz/reportPV`, params)
}

export default apis