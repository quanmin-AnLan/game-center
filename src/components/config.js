// 获取所有的vue文件
const ctx = require.context('../components', true, /\.vue$/)

// 以字母Al开头命名的自动注册为全局组件，无需引入可直接使用
export default (app) => {
  ctx.keys().forEach(row => {
    // 当前组件文件路径包含"Al"时才进行处理
    if (/.*Al.*/.test(row) && !(/components/.test(row))) {
      // 获取该组件并处理其名字
      const component = ctx(row).default
      // 使用component.name作为该组件名称，同时向Vue实例中注册该组件，使之成为全局组件
      app.component(
        component.name,
        component
      )
    }
  })
}