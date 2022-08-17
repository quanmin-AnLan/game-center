<template>
  <section class="user-show-main">
    <section class="user-container">
      <section class="user-info">
        <div class="user-img">
          <el-image :src="$fn.cut(userData.imgSrc, 300, 300)" :preview-src-list="[$fn.removeCut(userData.imgSrc, 300, 300)]"
            alt="头像" v-if="userData.imgSrc" lazy fit="fill" />
        </div>
        <div class="user-card">
          <div class="user-username">{{userData.user}}</div>
          <div class="user-description">{{userData.description}}</div>
          <el-button v-if="Number($route.params.id) === $store.state.userInfo.id"
            @click="$router.push({ path: '/UserCenter/edit' })">编辑个人资料</el-button>
        </div>
      </section>
      <section class="user-message">

      </section>
    </section>
  </section>
</template>

<script>
import apis from '@/api'
export default {
  name: 'UserShow',
  data() {
    return {
      userData: {}
    }
  },
  created() {
    // id非法则404
    if (isNaN(parseInt(this.$route.params.id))) {
      this.$router.push({path: '/DefaultError'})
    }
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const params = {
        id: this.$route.params.id,
        type: 'id'
      }
      apis.getUserInfo(params).then(res => {
        if (!res.id) {
          this.$router.push({ path: '/DefaultError' })
        } else {
          this.userData = res
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-show-main {
  margin-top: 20px;
}
.user-container {
  width: 1200px;
  margin: 0 auto;
}
.user-info {
  height: 300px;
  display: flex;
}
.user-img {
  .square(300px);
  margin-right: 24px;
}
.user-card {
  flex: 1;
}
</style>
