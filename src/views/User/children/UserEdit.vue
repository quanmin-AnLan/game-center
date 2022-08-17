<template>
  <section class="user-show-main">
    <section class="user-container">
      <section class="user-info">
        <div class="user-img">
          <al-upload :baseSrc="baseUserInfo.imgSrc" @imgSrc="getImgSrc"></al-upload>
        </div>
        <div class="user-card">
          <div class="user-card-item">
            <div class="common-input-box half-box">
              <div class="common-input-line user-line">
                <div class="common-input-label">用户昵称：</div>
                <el-input class="common-input-value" v-model="baseUserInfo.user"></el-input>
              </div>
              <div class="common-input-line user-line">
                <div class="common-input-label">用户密码：</div>
                <el-input class="common-input-value" v-model="baseUserInfo.password" show-password></el-input>
              </div>
            </div>
            <div class="operate-box">
              <el-button class="submit-button" @click="submit" type="primary">提交</el-button>
              <el-button class="submit-button" @click="handleCancel">取消</el-button>
            </div>
          </div>
          <div class="user-card-item">
            <div class="common-input-box half-box">
              <div class="common-input-label">用户简介：</div>
              <el-input class="common-input-value" v-model="baseUserInfo.description"></el-input>
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
export default {
  name: 'UserEdit',
  data() {
    return {
      baseUserInfo: {}
    }
  },
  created() {
    this.baseUserInfo = JSON.parse(JSON.stringify(this.$store.state.userInfo))
  },
  methods: {
    submit() {
      apis.editUser(this.baseUserInfo).then(() => {
        this.$fn.refreshUserInfo()
        this.handleCancel()
      })
    },
    handleCancel() {
      this.$router.push({
        path: `/UserCenter/show/${this.$store.state.userInfo.id}`
      })
    },
    getImgSrc(src) {
      this.baseUserInfo.imgSrc = src || this.baseUserInfo.imgSrc
    },
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
  height: 160px;
  display: flex;
}
.user-img {
  .square(160px);
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

.common-input-label {
  line-height: 40px;
}

.half-box {
  width: 60%;
  margin-right: 24px;
}

.user-line {
  width: 100%;
  margin-bottom: 16px;
}

.operate-box {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.submit-button {
  width: 80px;
  height: 36px;
  line-height: 36px;
  padding: 0;
}
</style>
