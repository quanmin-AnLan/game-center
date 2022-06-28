import Http from '../../services/index'

const apis = {
  getQiniuToken: (params) => Http.post(`http://data.anlan.xyz/getQiniuToken`, params),
}

export default apis