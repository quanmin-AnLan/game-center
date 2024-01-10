<template>
  <section>
    <!-- 静态图片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc)" :preview-src-list="[$fn.toWebp(imgSrc)]" lazy fit="fill"></el-image>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'PenguinFightCombo',
  data() {
    return {
      imgSrc: 'http://img.anlan.xyz/ledou/linli/jingmai.png'
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