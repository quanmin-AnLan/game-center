import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteIns from './routeInit'
import { routes } from './config'

Vue.use(VueRouter)

import store from '../store/index'

store.dispatch('app/UpdateAsyncRouteReady', '') //  初始化动态路由挂载状态

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  // 路由初始化
  RouteIns.run(to)
  // 进入目标路由
  next();
});
