const app = {
  namespaced: true,
  state: {
    asyncRouteReady: "",
    loginVisible: false,
    routeTabVisible: false,
    userInfo: {},
    OutlinkSrc: "",
    showOutlink: false,
  },
  mutations: {
    SetAsyncRouteReady: (state, module) => {
      state.asyncRouteReady = module;
    },
    SetLoginVisible: (state, module) => {
      state.loginVisible = module;
    },
    SetRouteTabVisible: (state, module) => {
      state.routeTabVisible = module;
    },
    SetUserInfo: (state, module) => {
      state.userInfo = module;
    },
    SetOutlinkSrc: (state, module) => {
      state.OutlinkSrc = module;
    },
    SetShowOutlink: (state, module) => {
      state.showOutlink = module;
    },
  },
  actions: {
    UpdateAsyncRouteReady: (ctx, info) => {
      ctx.commit("SetAsyncRouteReady", info);
    },
    UpdateLoginVisible: (ctx, info) => {
      ctx.commit("SetLoginVisible", info);
    },
    UpdateRouteTabVisible: (ctx, info) => {
      ctx.commit("SetRouteTabVisible", info);
    },
    UpdateUserInfo: (ctx, info) => {
      ctx.commit("SetUserInfo", info);
    },
    UpdateOutlinkSrc: (ctx, info) => {
      ctx.commit("SetOutlinkSrc", info);
    },
    UpdateShowOutLink: (ctx, info) => {
      ctx.commit("SetShowOutlink", info);
    },
  },
};

export default app