<template>
  <section>
    <li>
      <div class="common-input-line">
        <div class="common-input-label">区服：</div>
        <div class="area">
          <el-select v-model="os" class="common-select">
            <el-option label="微信" value="微信"></el-option>
            <el-option label="QQ" value="QQ"></el-option>
          </el-select>
          <el-select v-model="channel" :disabled="!os" class="common-select">
            <el-option label="空间" value="空间" v-if="os === 'QQ'"></el-option>
            <el-option label="小程序" value="小程序"></el-option>
            <el-option label="H5" value="H5"></el-option>
          </el-select>
          <el-input clearable placeholder="请输入" v-model.trim="num" class="common-select"></el-input>
          <span style="line-height: 40px;">区</span>
        </div>
      </div>
    </li>
    <li>
      <div class="common-input-line">
        <div class="common-input-label">ID：</div>
        <el-input clearable placeholder="请输入用户ID" v-model.trim="id" class="common-input-value"></el-input>
      </div>
    </li>
    <li>
      <div class="common-input-line">
        <div class="common-input-label">理由：</div>
        <el-input clearable placeholder="请输入举报理由（选填）" v-model.trim="reason" class="common-input-value"></el-input>
      </div>
    </li>
    <li>
      <div class="common-input-line">
        <div class="common-input-label">截图：</div>
          <el-upload action="http://api.anlan.xyz/upload/reportImg" :headers="headers" :data="data" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" class="avatar-uploader">
            <el-image class="avatar" v-if="resourceSrc" :src="resourceSrc" :preview-src-list="[resourceSrc]" fit="fill"
              @click.stop></el-image>
            <div v-else class="upload">
              <i class="el-icon-plus avatar-uploader-icon"></i>
              <span class="tip-info">点击上传图片</span>
            </div>
            <div v-if="resourceSrc" class="cover-edit">
              <div class="edit-text">替换</div>
            </div>
          </el-upload>
      </div>
    </li>
    <div class="button-box">
      <el-button type="primary" @click="submit()">提交</el-button>
      <el-button @click="close()">关闭</el-button>
    </div>
  </section>
</template>

<script>
import apis from '@/api'
export default {
  data() {
    return {
      os: '',
      channel: '',
      num: '',
      id: '',
      reason: '',
      resourceSrc: '',
      data: {
        key: ''
      }
    }
  },
  computed: {
    region() {
      return this.os + this.channel + this.num + '区'
    },
    headers() {
      return {
        uuid: this.$store.state.userInfo.uuid
      }
    }
  },
  methods: {
    submit() {
      if (!this.checkData()) {
        return
      }
      const params = {
        region: this.region,
        userId: this.id,
        img: this.resourceSrc,
        reason: this.reason
      }
      apis.report(params).then((res) => {
        console.log(res);
        this.$emit('refresh')
        this.close()
      })
    },
    checkData() {
      let result = true
      if (!this.os || !this.channel || !this.num) {
        this.$message.error('请完善区服信息')
        result = false
        return result
      }
      if (!this.id) {
        this.$message.error('请填入id')
        result = false
        return result
      }
      if (!this.resourceSrc) {
        this.$message.error('请上传截图')
        result = false
        return result
      }
      return result
    },
    close() {
      Object.assign(this.$data, this.$options.data());
      this.$emit('close')
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isGIF && !isPNG) {
        this.$message.error('上传图片必须是JPG/GIF/PNG 格式!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      let key = `game-center/reportImg/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/${+new Date()}-${file.name}`
      this.data.key = key
      return (isJPG || isGIF || isPNG) && isLt2M
    },
    handleAvatarSuccess(res) {
      this.resourceSrc = 'http://img.anlan.xyz/' + res.data
      this.$emit('imgSrc', this.resourceSrc)
    },
  }
}
</script>

<style lang="less" scoped>
.common-input-line {
  width: 100%;
  margin-bottom: 16px;
}
.common-input-label {
  line-height: 40px;
  margin-right: 24px;
}
.area {
  display: flex;
}
.common-select {
  width: 100px;
  margin-right: 8px;
}
.button-box {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}
.avatar-uploader {
  border: 1.5px dashed @blue;
  .square(163px);
  background-color: @lightWhite;
  position: relative;
  box-sizing: border-box;
  .flex-center;
  &:hover .cover-edit {
    display: flex;
  }
}
.avatar {
  .square(160px);
  cursor: pointer;
}
/deep/ .el-upload {
  max-height: 160px;
}
.cover-edit {
  display: none;
  width: 160px;
  line-height: 32px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.edit-text {
  width: 100%;
  color: @white;
  background: @avatar;
  border-right: 1px solid @lightWhite;
}
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-uploader-icon {
  font-size: 25px;
  color: @blue;
}
.tip-info {
  margin-top: 10px;
  color: @lightBlue;
}
</style>
