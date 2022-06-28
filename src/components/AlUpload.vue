<template>
  <el-upload
    action="https://upload.qiniup.com"
    :data="qn"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
      <el-image v-if="resource == 'img' && resourceSrc" :src="resourceSrc" fit="fill"></el-image>
      <el-button v-else>上传{{resource}}</el-button>
  </el-upload>
</template>

<script>
import apis from '@/api'
export default {
  name: 'AlUpload',
  props: {
    resource: {
      type: 'string',
      default: 'img'
    }
  },
  data () {
    return {
      qn: {
        key: '',
        token: ''
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
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      let key = `game-center/img/${new Date().getFullYear()}/${new Date().getMonth + 1}${new Date().getDate()}/${file.name}`
      await this.getUploadToken(key)
      return (isJPG || isGIF || isPNG) && isLt2M
    },
    getUploadToken: async function (key) {
      apis.getQiniuToken().then((res) => {
        const { data } = res
        if (data?.upToken) {
          this.qn.token = data.upToken
          this.qn.key = key
        }
      })
    },
    handleAvatarSuccess(res) {
      this.resourceSrc = 'http://img.anlan.xyz/' + res.key
    }
  },
}
</script>
