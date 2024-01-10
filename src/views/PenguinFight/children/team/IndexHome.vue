<template>
  <section>
    <!-- 静态图片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>升级</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc1)" :preview-src-list="[$fn.toWebp(imgSrc1)]" lazy fit="fill"></el-image>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修炼馆</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc2)" :preview-src-list="[$fn.toWebp(imgSrc2)]" lazy fit="fill"></el-image>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>遗迹</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc3)" :preview-src-list="[$fn.toWebp(imgSrc3)]" lazy fit="fill"></el-image>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>押镖</span>
      </div>
      <el-image :src="$fn.toWebp(imgSrc4)" :preview-src-list="[$fn.toWebp(imgSrc4)]" lazy fit="fill"></el-image>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'PenguinFightCombo',
  data() {
    return {
      imgSrc1: 'http://img.anlan.xyz/ledou/linli/bangpai.png',
      imgSrc2: 'http://img.anlan.xyz/ledou/linli/xiu.png',
      imgSrc3: 'http://img.anlan.xyz/ledou/linli/yiji.png',
      imgSrc4: 'http://img.anlan.xyz/ledou/linli/yabiao.png',
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