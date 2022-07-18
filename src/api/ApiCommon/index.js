import Http from '../../services/index'

const apis = {
  getQiniuToken: (params) => Http.post(`http://data.anlan.xyz/upload`, params),
  reportPV: (params) => Http.get(`http://data.anlan.xyz/reportPV`, params)
}

export default apis