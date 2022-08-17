<template>
  <section class="nav-main">
    <nav class="nav-container">
      <section class="nav-logo">
        <span class="nav-title">{{ title }}</span>
      </section>
      <section class="user-info">
        <img :src="$fn.cut($store.state.userInfo.imgSrc, 30, 30)" alt="头像" class="nav-img" v-if="$store.state.userInfo.imgSrc">
        <el-dropdown v-if="$store.state.userInfo.uuid" placement="bottom" @command="dropDownClick" class="dropdown-box">
          <span class="dropdown-text">
            {{ $store.state.userInfo.user }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in dropdownConfig" :key="index" :command="{ event: item.event, eventKey: item.eventKey }">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span v-else @click="$fn.login" class="common-icon login-button">未登录</span>
      </section>
    </nav>
    <el-button v-if="$route.path !== '/'" type="text" @click="$fn.changeRoute" class="change-route">切换站点</el-button>
  </section>
</template>

<script>
export default {
  name: 'AlNav',
  data() {
    return {
      title: '安澜网',
      dropdownConfig: [
        {
          label: '个人中心',
          event: 'routerPush',
          eventKey: `/UserCenter/show/`
        },
        {
          label: '退出登录',
          event: 'logout'
        }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.title = document.title
    })
  },
  methods: {
    dropDownClick({ event, eventKey }) {
      this[event](eventKey)
    },
    routerPush(router) {
      if (router.indexOf(/show/) > -1) {
        router += this.$store.state.userInfo.id
      }
      this.$store.commit('SetRouteTabVisible', false)
      this.$router.push({path: router})
    },
    logout() {
      localStorage.removeItem('user_info')
      this.$store.commit('SetUserInfo', {})
      this.$message.success('登出成功')
      this.routerPush('/')
    }
  }
}
</script>

<style lang="less" scoped>
.nav-main {
  position: fixed;
  top: 0;
  left: 0;
  height: 48px;
  width: 100%;
  background-color: @nav;
  color: @lightWhite;
  z-index: 99999;
}
.nav-container {
  width: 1200px;
  height: 30px;
  line-height: 30px;
  margin: 9px auto;
  display: flex;
  justify-content: space-between;
}
.nav-img {
  margin-right: 16px;
}
.dropdown-box {
  vertical-align: top;
}
.dropdown-text {
  color: @lightWhite;
}
.change-route {
  .pos-a-center
}
.login-button {
  &:hover {
    color: @warn;
  }
}
</style>
