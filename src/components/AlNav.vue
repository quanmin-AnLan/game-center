<template>
  <section class="nav-main">
    <nav class="nav-container">
      <section class="nav-logo">
        <span class="nav-title">{{ title }}</span>
      </section>
      <section class="user-info">
        <el-avatar :src="$fn.cut($store.state.userInfo.imgSrc, 80, 80)" v-if="$store.state.userInfo.imgSrc" class="nav-img"></el-avatar>
        <el-dropdown v-if="$store.state.userInfo.uuid" placement="bottom" @command="dropDownClick" class="common-icon dropdown-box">
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
      if (window.location.pathname !== '/') {
        this.routerPush('/')
      }
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
  height: 48px;
  line-height: 48px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.nav-img {
  margin: 4px 12px 0 0;
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
