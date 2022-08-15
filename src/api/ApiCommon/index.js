import Http from '../../services/index'

const apis = {
  // 上传接口
  getQiniuToken: (params) => Http.post(`/upload/img`, params),
  // pv上报
  reportPV: (params) => Http.get(`/report/pv`, params)
}

export default apis