import Http from '../../services/index'

const apis = {
    // 登录
    login: (params) => Http.post(`http://data.anlan.xyz/login`, params),
    // 注册
    register: (params) => Http.post(`http://data.anlan.xyz/register`, params)
}

export default apis