import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asyncRouteReady: '', // 储存着用户去往哪个页面的路由信息
    loginVisible: false,
    routeTabVisible: false, // 全局的路由标签栏是否可见
    userInfo: {},
  },
  getters: {},
  mutations: {
    SetAsyncRouteReady: (state, module) => {
      state.asyncRouteReady = module;
    },
    SetLoginVisible: (state, module) => {
      state.loginVisible = module
    },
    SetRouteTabVisible: (state, module) => {
      state.routeTabVisible = module
    },
    SetUserInfo: (state, module) => {
      state.userInfo = module
    },

  },
  actions: {},
  modules: {}
})