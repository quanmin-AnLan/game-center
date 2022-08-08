<template>
  <section>
    <!-- 切换菜单组件 -->
    <al-module-list v-if="isShowModuleList" @close="closeModuleList"></al-module-list>
    <el-button @click="showModuleList">切换</el-button>
    <div>我的世界主页</div>
    <el-button @click="$fn.login">登录</el-button>
  </section>
</template>

<script>
export default {
  name: 'MCHome',
  data() {
    return {
      isShowModuleList: false // 控制切换菜单是否展示，默认不展示
    }
  },
  methods: {
    // 展示切换菜单
    showModuleList() {
      this.isShowModuleList = true
    },
    // 点击灰色遮罩关闭切换菜单
    closeModuleList() {
      this.isShowModuleList = false
    },
  }
}
</script>