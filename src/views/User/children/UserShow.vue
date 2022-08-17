<template>
  <section class="user-show-main">
    <section class="user-container">
      <section class="user-info">
        <div class="user-img">
          <el-image :src="$fn.cut(userData.imgSrc, 300, 300)" :preview-src-list="[$fn.removeCut(userData.imgSrc)]"
            alt="头像" v-if="userData.imgSrc" lazy fit="fill" />
          <el-image :src="$fn.cut($fn.toWebp(baseImg), 300, 300)" :preview-src-list="[$fn.removeCut(baseImg)]"
            alt="头像" v-if="noImgSrc" lazy fit="fill" ></el-image>
        </div>
        <div class="user-card">
          <div class="user-card-item">
            <div class="common-input-box half-box">
              <div class="common-input-line user-line">
                <div class="common-input-label">用户昵称：</div>
                <div class="common-input-value">{{userData.user}}</div>
              </div>
              <div class="common-input-line user-line">
                <div class="common-input-label">用户权限：</div>
                <div class="common-input-value">{{authList[userData.level]}}</div>
              </div>
            </div>
            <div class="operate-box">
              <el-button class="edit-button" v-if="Number($route.params.id) === $store.state.userInfo.id" @click="$router.push({ path: '/UserCenter/edit' })">编辑个人资料</el-button>
            </div>
          </div>
          <div class="user-card-item">
            <div class="common-input-box all-box">
              <div class="common-input-label">用户简介：</div>
              <div class="common-input-value">{{userData.description}}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="user-message">

      </section>
    </section>
  </section>
</template>

<script>
import apis from '@/api'
import {authConfig} from '../../Auth/config'
export default {
  name: 'UserShow',
  data() {
    return {
      userData: {},
      authList: authConfig.authList,
      baseImg: 'http://img.anlan.xyz/404.jpg',
      noImgSrc: false
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
          if (!this.userData.imgSrc) {
            this.noImgSrc = true
          }
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.user-card-item {
  height: 140px;
  display: flex;
}

.common-input-box {
  height: 100%;
}

.half-box {
  width: 60%;
  margin-right: 24px;
}

.all-box {
  width: 100%;
}

.user-line {
  width: 100%;
}

.operate-box {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.edit-button {
  width: 120px;
  height: 48px;
}
</style>
