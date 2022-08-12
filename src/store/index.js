import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asyncRouteReady: '',
    loginVisible: false,
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
    SetUserInfo: (state, module) => {
      state.userInfo = module
    }
  },
  actions: {},
  modules: {}
})