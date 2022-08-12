import Vue from 'vue'
import VueRouter from 'vue-router'
import apis from '@/api'

Vue.use(VueRouter)

import store from '../store/index'

store.commit('SetAsyncRouteReady', '') //  初始化动态路由挂载状态

const routes = [{
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
    path: '/Auth',
    name: 'Auth',
    component: () => import('../views/Auth/DefaultIndex.vue')
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
  let spmC = ''
  if (to.path === '/') {
    spmC = 'home'
  } else {
    const baseSpmC = to.path.split('/')
    if (baseSpmC[0] === '') {
      baseSpmC.shift()
    }
    const end = baseSpmC[baseSpmC.length - 1]
    var n = Number(end);
    if (!isNaN(n) && n !== 404) {
      baseSpmC.pop()
    }
    spmC = baseSpmC.join('-')
  }
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const params = {
    setDate: `${year}/${month}/${day}`,
    spm: `smpc.anlan-game.${spmC}`
  }
  apis.reportPV(params)
  // 获取即将进入的路由信息存入vuex
  let moduleType = to.fullPath.split('/')[1]
  store.commit('SetAsyncRouteReady', moduleType)
  // 进入目标路由
  next();
});