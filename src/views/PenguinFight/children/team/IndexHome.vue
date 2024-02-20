<template>
  <section>
    <!-- 静态图片 -->
    <el-card class="box-card" v-for="(item, index) in imgList" :key="index">
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
      </div>
      <el-image :src="$fn.toWebp(item.src)" :preview-src-list="[$fn.toWebp(item.src)]" lazy fit="fill"></el-image>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'PenguinFightCombo',
  data() {
    return {
      imgList: [
        {
          title: '升级',
          src: 'http://img.anlan.xyz/ledou/linli/bangpai.png'
        },
        {
          title: '修炼馆',
          src: 'http://img.anlan.xyz/ledou/linli/xiu.png'
        },
        {
          title: '遗迹',
          src: 'http://img.anlan.xyz/ledou/linli/yiji.png'
        },
        {
          title: '押镖',
          src: 'http://img.anlan.xyz/ledou/linli/yabiao.png'
        }
      ]
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