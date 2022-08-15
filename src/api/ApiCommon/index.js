import Http from '../../services/index'

const apis = {
  // pv上报
  reportPV: (params) => Http.get(`/report/pv`, params)
}

export default apis