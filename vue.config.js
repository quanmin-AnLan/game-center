const {
  defineConfig
} = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin"); // 引入压缩插件
const path = require('path') // 引入 path模块(路径)
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,// 对依赖进行 babel 转译
  publicPath: '/', // 部署应用时的根路径
  outputDir: 'dist',// 打包输出目录
  assetsDir: 'assets',// 静态资源目录
  productionSourceMap: false,// 生产环境不生成 sourceMap 文件，（但是具体作用还需了解）
  chainWebpack: config => {
    config
      // 向HTML添加了title属性
      .plugin('html')
      .tap(args => {
        // 设默认title为游戏中心
        args[0].title = '安澜网 - 游戏中心'
        return args
      })
  },
  configureWebpack: {
    optimization: {
      // 通过优化拆分代码块来提高页面加载速度,使用 splitChunks 插件进行文件的拆分
      splitChunks: {
        // chunks: 表示按需加载时需要选取哪些模块，默认值为 async ，也就是表示异步加载模块。而'all'则表示会马上加载所有模块，同时该值还支持两个可取值：initial/all/async（密钥字母顺序全屏）
        chunks: "all",
        // 生成的chunk的最小值
        minSize: 0,
        // 入口点处能够并行请求的chunks数量
        maxInitialRequests: Infinity,
        // 定义多个 cacheGroup 来控制不同模块的拆分策略
        cacheGroups: {
          libs: { // 第三方库
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial"
          },
          elementUI: { // element 单独拆包
            name: "chunk-el",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 20 // 权重要大于 libs
          },
          echarts: { // echarts 单独拆包
            name: "chunk-echarts",
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            priority: 20 // 权重要大于 libs
          },
          commons: { // 公共模块包
            name: `chunk-commons`,
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true
          }
        },
      }
    },
    plugins: [
      // 排除moment库的国际化语言文件，减小打包后文件的大小。
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      // 压缩打包后的文件，加快用户访问速度
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(html|js|json|ttf|woff|css|jpeg|jpg|png)$/,
        threshold: 0,
        minRatio: 1,
        deleteOriginalAssets: false,
      }),
      // 设置最大入口数量，最小尺寸----避免打包过大
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 15
      }),
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 1000
      })
    ]
  },
  pluginOptions: {
    // 注册全局less
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/less/main.less')
      ]
    }
  }
})