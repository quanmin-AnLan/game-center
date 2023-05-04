import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asyncRouteReady: '',
    loginVisible: false,
    routeTabVisible: false,
    userInfo: {},
    WebSocketinfo: null,
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
    scoketInfo: (state, module) => {
      state.WebSocketinfo = module
    }
  },
  actions: {},
  modules: {}
})