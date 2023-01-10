import apis from '@/api'
import { routeMap } from './config'
import store from '../store/index'

class RouteInit {
  constructor() {
    this.path = '/'
    this.fullPath = '/'
  }

  run(to) {
    const { path, fullPath } = to
    this.path = path
    this.fullPath = fullPath
    this.handler()
  }

  handler() {
    this.spmReport()

    this.initTitle()

    this.updateRouteStore()
  }

  // pv上报
  spmReport() {
    let spmC = ''
    if (this.path === '/') {
      spmC = 'home'
    } else {
      const baseSpmC = this.path.split('/')
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
  }

  // title初始化
  initTitle() {
    const mainPath = this.path.split('/')[1]
    const mapTitle = routeMap[mainPath]
    window.document.title = mapTitle && `游戏中心 - ${mapTitle}` || '安澜网 - 游戏中心';
  }

  // 获取即将进入的路由信息存入vuex
  updateRouteStore() {
    let moduleType = this.fullPath.split('/')[1]
    store.commit('SetAsyncRouteReady', moduleType)
  }
}

export default new RouteInit()
