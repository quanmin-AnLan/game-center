<template>
  <section>
    <!-- 切换菜单组件 -->
    <al-module-list v-if="isShowModuleList" @close="closeModuleList"></al-module-list>
    <el-button @click="showModuleList">切换</el-button>
    <div>英雄联盟主页</div>
    <el-button @click="loginVisible = true">登录</el-button>
    <al-login :loginVisible.sync="loginVisible"></al-login>
    <el-input v-model="number" disabled></el-input>
    <el-row v-for="(item, index) in config" :key="index">
      这是第{{item.value}}条数据
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="num in number" :key="num">
            将此条数据移动到第{{num}}条
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'LOLHome',
  data() {
    return {
      isShowModuleList: false, // 控制切换菜单是否展示，默认不展示
      loginVisible: false,
      number: 100
    }
  },
  computed: {
    config() {
      const arr = []
      for (let i = 0; i < this.number; i++) {
        arr.push({
          value: i
        })
      }
      return arr
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