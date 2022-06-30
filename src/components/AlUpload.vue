<template>
  <el-upload action="http://data.anlan.xyz/upload" :data="data" :show-file-list="false"
    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <el-image class="avatar" v-if="resource == 'img' && resourceSrc" :src="resourceSrc" fit="fill"></el-image>
    <el-button v-else>上传{{resourceMap[resource]}}</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'AlUpload',
  props: {
    resource: {
      type: String,
      default: 'img'
    }
  },
  data () {
    return {
      data: {
        key: ''
      },
      resourceMap: {
        img: '图片'
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
      let key = `game-center/img/${new Date().getFullYear()}/${new Date().getMonth() + 1}${new Date().getDate()}/${+new Date()}-${file.name}`
      this.data.key = key
      return (isJPG || isGIF || isPNG) && isLt2M
    },
    handleAvatarSuccess(res) {
      this.resourceSrc = 'http://img.anlan.xyz/' + res.data
    }
  },
}
</script>

<style lang="less" scoped>
.avatar {
  width: 200px;
}
</style>