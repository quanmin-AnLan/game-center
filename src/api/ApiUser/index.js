import Http from '../../services/index'

const apis = {
    // 登录
    login: (params) => Http.post(`http://82.157.95.66:3000/login`, params),
    // 注册
    register: (params) => Http.post(`http://82.157.95.66:3000/register`, params)
}

export default apis