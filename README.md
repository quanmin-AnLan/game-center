# [安澜网 - 游戏中心](http://game.anlan.xyz)

## 初始化/Project setup

``` shell
npm install // node v14.17.4
```

### 本地运行/Compiles and hot-reloads for development

```shell
npm run serve
```

### 项目构建/Compiles and minifies for production

``` shell
npm run build
```

### 检查代码/Lints and fixes files

``` shell
npm run lint
```

### 项目结构/Project structure

```txt
src为主目录
api为接口配置
components文件夹为全局通用组件
less文件夹为全局通用css及配置
router为路由配置
service为封装请求
store为vuex配置
utils为全局方法
views为具体页面
views下各页面文件夹代表各页面
各页面文件夹中components文件夹为该类页面专用组件
```

### 开发规范/Development specification

```txt
1. 用el-image代替img标签
2. 颜色写入less/var.less，如使用颜色与原有相近则采用原有颜色，不相近则增加配置
```

### 自定义配置/Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
