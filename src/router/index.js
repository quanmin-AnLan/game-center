import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '../store/index'

store.commit('SetAsyncRouteReady', '')   //  初始化动态路由挂载状态

const routes = [
  {
    path: '/',
    name: 'IndexHome',
    component: () => import('../views/IndexHome.vue')
  },
  {
    path: '/LeagueOfLegends',
    name: 'LeagueOfLegends',
    component: () => import('../views/LeagueOfLegends/DefaultIndex.vue')
  },
  {
    path: '/MineCraft',
    name: 'MineCraft',
    component: () => import('../views/MineCraft/DefaultIndex.vue')
  },
  {
    path: '/PenguinFight',
    name: 'PenguinFight',
    component: () => import('../views/PenguinFight/DefaultIndex.vue')
  },
  {
    path: '/DefaultError',
    name: 'DefaultError',
    component: () => import('../views/DefaultError.vue'),
  },
  {
    path: '*',
    redirect: '/DefaultError',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  // 若无特殊title则默认展示title为游戏中心
  window.document.title = to.meta.title || '游戏中心';
  // 获取即将进入的路由信息存入vuex
  let moduleType = to.fullPath.split('/')[1]
  store.commit('SetAsyncRouteReady', moduleType)
  // 进入目标路由
  next();
});
