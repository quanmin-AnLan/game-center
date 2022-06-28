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
      const isBMP = file.type === 'image/bmp'

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      //根据文件名生成上传唯一key值
      let key =
        'game-center/img/' +
        this.utils.formatDate(new Date().getTime(), 'YY/MM/DD/hh:mm:ss/') +
        file.name
      await this.getUploadToken(key)
      return (isJPG || isGIF || isPNG || isBMP) && isLt2M
    }
  },
  getUploadToken: async function (key) {
    const params = { key }
    apis.getQiniuToken(params).then((res) => {
      const { data } = res
      console.log(data)
      if (data?.upToken) {
        this.qn.token = data.upToken
        this.qn.key = key
      }
    })
  },
  //返回上传的图片地址
  handleAvatarSuccess(res) {
    this.resourceSrc = 'http://img.anlan.xyz/' + res.key
  }
}
</script>

<style lang="less" scoped>

</style>