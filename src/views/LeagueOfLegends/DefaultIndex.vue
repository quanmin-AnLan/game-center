<template>
  <section>
    <!-- 切换菜单组件 -->
    <al-module-list
      v-if="isShowModuleList"
      @close="closeModuleList"
    ></al-module-list>
    <el-button @click="showModuleList">切换</el-button>
    <div>英雄联盟主页</div>
    <el-button @click="$fn.login">登录</el-button>
    <el-row v-for="(item, index) in arr" :key="index">
      这是第{{ item.value }}条数据
      <el-dropdown @visible-change="changeDrop">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-if="dropdownShow">
            <el-dropdown-item v-for="num in number" :key="num">
              将此条数据移动到第{{ num }}条
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "LOLHome",
  data() {
    return {
      isShowModuleList: false, // 控制切换菜单是否展示，默认不展示
      number: 500,
      arr: [],
      dropdownShow: false,
    };
  },
  mounted() {
    for (let i = 0; i < this.number; i++) {
      this.arr.push({
        value: i,
      });
    }
  },
  methods: {
    // 展示切换菜单
    showModuleList() {
      this.isShowModuleList = true;
    },
    // 点击灰色遮罩关闭切换菜单
    closeModuleList() {
      this.isShowModuleList = false;
    },
    changeDrop() {
      this.dropdownShow = true;
    },
  },
};
</script>