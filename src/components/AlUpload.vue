<template>
  <!-- headers:上传的请求头，此处为每个用户单独的uuid   data:此处data里只有一个属性，属性值为用户上传的日期  show-file-list：false，不显示已上传文件列表  on-success:文件上传成功的内置回调函数 before-upload:文件上传后会返回Promise，然后可以继续上传，否则就停止上传   -->
  <el-upload
    action="http://api.anlan.xyz/upload/img"
    :headers="headers"
    :data="data"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    class="avatar-uploader"
  >
    <el-image
      class="avatar"
      v-if="resourceSrc"
      :src="resourceSrc"
      :preview-src-list="[resourceSrc]"
      fit="fill"
      @click.stop
    ></el-image>
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
export default {
  name: "AlUpload",
  props: {
    // 接收一个参数，值为用户上传的文件路径
    baseSrc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      data: {
        key: "",
      },
      resourceSrc: "",
      headers: {},
    };
  },
  created() {
    this.headers = {
      uuid: this.$store.state.userInfo.uuid,
    };
    this.resourceSrc = this.baseSrc;
  },
  methods: {
    // 此处为文件上传之前的函数，可以对文件进行定义上传需求。
    async beforeAvatarUpload(file) {
      // 限制文件上传的类型
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isGIF && !isPNG) {
        this.$message.error("上传图片必须是JPG/GIF/PNG 格式!");
      }
      // 限制文件大小2M以下
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      // 如果通过以上限制，就生成文件日期
      let key = `game-center/img/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}/${+new Date()}-${file.name}`;
      this.data.key = key;
      return (isJPG || isGIF || isPNG) && isLt2M;
    },
    // 上传成功后设置文件公共路径 + 文件路径 + 文件大小，最后通信给调用此组件的父组件
    handleAvatarSuccess(res) {
      this.resourceSrc = this.$fn.cut(
        "http://img.anlan.xyz/" + res.data,
        160,
        160
      );
      this.$emit("imgSrc", this.resourceSrc);
    },
  },
};
</script>

<style lang="less" scoped>
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