<template>
  <el-upload action="http://data.anlan.xyz/upload" :data="data" :show-file-list="false"
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
</template>

<script>
import { cutPicUrl } from '../utils/format'
export default {
  name: 'AlUpload',
  data () {
    return {
      data: {
        key: ''
      },
      resourceSrc: ''
    }
  },
  methods: {
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
      let key = `game-center/img/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/${+new Date()}-${file.name}`
      this.data.key = key
      return (isJPG || isGIF || isPNG) && isLt2M
    },
    handleAvatarSuccess(res) {
      this.resourceSrc = cutPicUrl('http://img.anlan.xyz/' + res.data, 160, 160)
      this.$emit('imgSrc', this.resourceSrc)
    }
  },
}
</script>

<style lang="less" scoped>
.avatar-uploader {
  border: 1.5px dashed #628EFC;
  height: 163px;
  width: 163px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f3fa;
  position: relative;
  box-sizing: border-box;
  &:hover .cover-edit {
    display: flex;
  }
}
.avatar {
  width: 160px;
  height: 160px;
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
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-right: 1px solid rgba(255, 255, 255, 0.4);
}
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-uploader-icon {
  font-size: 25px;
  color: #628EFC;
}
.tip-info {
  margin-top: 10px;
  color: #b3b9d1;
}
</style>