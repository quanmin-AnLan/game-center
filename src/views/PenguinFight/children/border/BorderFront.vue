<template>
  <section>
    <!-- 静态图片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc)" :preview-src-list="[$fn.toWebp(imgSrc)]" lazy fit="fill"></el-image>
      <el-image :src="$fn.toWebp(imgSrc2)" :preview-src-list="[$fn.toWebp(imgSrc2)]" lazy fit="fill"></el-image>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'PenguinFightBorderFront',
  data() {
    return {
      imgSrc: 'http://img.anlan.xyz/ledou/linli/fazhen.png',
      imgSrc2: 'http://img.anlan.xyz/ledou/yym/fazhen.JPG'
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  text-align: left;
  margin-bottom: 24px;
}
</style>