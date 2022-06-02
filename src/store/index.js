import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    asyncRouteReady: '',
  },
  getters: {
  },
  mutations: {
    SetAsyncRouteReady:(state, module) => {
      state.asyncRouteReady = module;
    },
  },
  actions: {
  },
  modules: {
  }
})
