import apis from '@/api'
import { routeMap } from './config'
import store from '../store/index'

class RouteInit {
  constructor() {
    this.path = '/' //路由的路径
    this.fullPath = '/' // 完整路径
  }

  run(to) {
    // 从路由对象中，解析出这两个信息，且赋值
    const { path, fullPath } = to
    this.path = path
    this.fullPath = fullPath
    this.handler()
  }

  handler() {
    // 将用户去往所在页面的路由路径信息储存到接口中
    this.spmReport()
    // 使用对应路径的标题
    this.initTitle()
    // 将用户去往的路由信息放在全局store里面
    this.updateRouteStore()
  }

  // pv上报
  spmReport() {
    let spmC = ''
    // 1.如果路径是/，表示当前去往的是首页IndexHome.vue
    if (this.path === '/') {
      spmC = 'home'
    } else {
      // 否则就拿到/后面的路径
      const baseSpmC = this.path.split('/')
      if (baseSpmC[0] === '') {
        baseSpmC.shift()
      }
      const end = baseSpmC[baseSpmC.length - 1]
      var n = Number(end);
      // 404页面不计入
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
    // 参数为：1：当天的年月日，2：前缀加上访问的路径
    const params = {
      setDate: `${year}/${month}/${day}`,
      spm: `smpc.anlan-game.${spmC}`
    }
    // 调用PV上报接口，传参
    apis.reportPV(params)
  }

  // title初始化
  initTitle() {
    // 从标题对象中，取出对应的值，作为标题，且加上统一前缀
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
