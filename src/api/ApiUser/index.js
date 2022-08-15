import Http from '../../services/index'

const baseApi = '/user'

const apis = {
    // 登录
    login: (params) => Http.post(`${baseApi}/login`, params),
    // 注册
    register: (params) => Http.post(`${baseApi}/register`, params),
    // 用户列表
    getUserList: () => Http.get(`${baseApi}/getList`),
    // 用户编辑
    editUser: (params) => Http.post(`${baseApi}/edit`, params),
    // 更改权限
    changeUserAuth: (params) => Http.post(`${baseApi}/auth`, params),
}

export default apis