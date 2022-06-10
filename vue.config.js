const {
  defineConfig
} = require('@vue/cli-service')
const CompressionPlugin = require("compression-webpack-plugin");
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 设默认title为游戏中心
        args[0].title = '游戏中心'
        return args
      })
  },
  configureWebpack: config => {
    // 如正式环境则开启gzip static
    if (process.env.NODE_ENV === 'production') {
      const plugins = []
      plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(html|js|json|ttf|css|jpeg|jpg|png)$/,
          threshold: 0,
          minRatio: 1,
          deleteOriginalAssets: false,
        }),
      )
      config.plugins = [
        ...config.plugins,
        ...plugins
      ]
    }
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