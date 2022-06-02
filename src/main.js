import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './less/main.less'
import logonComponents from './components/config'
import * as echarts from 'echarts'

Vue.config.productionTip = false

logonComponents(Vue)

Vue.use(ElementUI)
Vue.use(echarts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
