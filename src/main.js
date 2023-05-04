import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import './less/main.less'
import logonComponents from './components/config'
import * as echarts from 'echarts'
import { fn } from '@/utils/common'
import webSocket from "@/utils/scoket"
let webSocketUrl = new webSocket('ip/url', 10)

Vue.config.productionTip = false

// 注册全局组件
logonComponents(Vue)

Vue.use(ElementUI)
Vue.use(echarts)

Vue.prototype.$fn = fn;
Vue.prototype.$scoket = webSocketUrl;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')