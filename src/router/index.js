import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteIns from './routeInit'
import { routes } from './config'

Vue.use(VueRouter)

import store from '../store/index'

store.commit('SetAsyncRouteReady', '') //  初始化动态路由挂载状态

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 路由初始化,to中拿到了fullPath和path
  RouteIns.run(to)
  // 进入目标路由
  next();
});
