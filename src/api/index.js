let apis = {}

// 把所有接口合并到apis中
// 从api文件夹下，获取所有匹配到的js文件，并且实现上下文
var ctx = require.context('../api', true, /\.js$/)
// ctx.keys()遍历出context中的所有模块，并通过.forEach()方法遍历匹配
ctx.keys().forEach(item => {
  // 指定Api的规则进行匹配
  if (/.*Api*/.test(item)) {
    // 从中获取默认导出的模块，然后将其作为一个对象属性添加进创建好的apis对象中。
    const api = ctx(item).default
    // 合并自己，和新的api对象
    apis = Object.assign({}, apis, api)
  }
})
// 默认导出，在使用的时候， apis.指定的方法即可
export default apis
