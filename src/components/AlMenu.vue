<template>
  <el-menu :default-active="defaultActive" @select="intoMenu" :background-color="colorConfig.bgColor"
    :text-color="colorConfig.textColor" :active-text-color="colorConfig.activeColor" class="menu-section"
    :collapse="isCollapse" :collapse-transition="false">
    <template v-for="(items, index) in menuData">
      <el-submenu v-if="items.children.length > 0 && (!items.auth || (items.auth && level && items.auth < level))" :key="index" :index="items.index">
        <template slot="title">
          <i :class="`el-icon-${items.icon}`"></i>
          <span>{{ items.title }}</span>
        </template>
        <template v-for="(item, i) in items.children">
          <el-submenu v-if="item.children.length > 0 && (!item.auth || (items.auth && level && item.auth < level))" :key="i" :index="item.index">
            <template slot="title">
              <i :class="`el-icon-${item.icon}`"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item :index="ite.index" v-for="(ite, j) in item.children" :key="j">
              <i :class="`el-icon-${ite.icon}`"></i>
              <span>{{ ite.title }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else-if="!item.auth || (items.auth && level && item.auth < level)" :key="item.index" :index="item.index">
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else-if=" !items.auth || (items.auth && level && items.auth < level)" :key="items.index" :index="items.index">
        <i :class="`el-icon-${items.icon}`"></i>
        <span>{{ items.title }}</span>
      </el-menu-item>
    </template>

    <section class="collapse-button" @click="changeCollapse">
      <i class="el-icon-s-fold" v-if="isCollapse"></i>
      <i class="el-icon-s-unfold" v-else></i>
    </section>
  </el-menu>
</template>

<script>
export default {
  name: 'AlMenu',
  props: {
    menuKey: {
      type: String,
      default: ''
    },
    menuData: {
      type: Array,
      default: () => []
    },
    colorConfig: {
      type: Object,
      default: () => ({
        bgColor: '#545c64',
        textColor: '#fff',
        activeColor: '#ffd04b'
      })
    }
  },
  data() {
    return {
      isCollapse: false,
      defaultActive: '/home'
    }
  },
  computed: {
    level () {
      const result = this.$store.state.userInfo.level || 0
      return result
    }
  },
  created() {
    this.getActive()
    this.isCollapse = localStorage.getItem('isCollapse') === 'true'
  },
  methods: {
    intoMenu(key) {
      if (key === this.defaultActive) {
        return
      }
      this.defaultActive = key
      this.$router.push({
        path: this.menuKey + key
      })
    },
    getActive() {
      const path = this.$route.path
      const pathArr = path.split('/')
      pathArr.splice(1, 1)
      this.defaultActive = pathArr.join('/')
    },
    changeCollapse() {
      this.isCollapse = !this.isCollapse
      localStorage.setItem('isCollapse', this.isCollapse)
    }
  }
}
</script>

<style lang="less" scoped>
.menu-section {
  height: calc(100vh - 48px);
  text-align: left;
  position: relative;
}
.collapse-button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: rgb(67, 74, 80);
    color: #ffd04b;
  }
}

.el-menu-item [class^=el-icon-] {
  vertical-align: text-bottom;
}
</style>
