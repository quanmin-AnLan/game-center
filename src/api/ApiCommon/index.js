import Http from '../../services/index'

const apis = {
  getQiniuToken: (params) => Http.post(`http://data.anlan.xyz/upload`, params),
}

export default apis