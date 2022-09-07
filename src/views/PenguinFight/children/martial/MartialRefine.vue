<template>
  <section class="inner-content">
    <el-image :src="imgSrc" :preview-src-list="[imgSrc]" lazy fit="fill"></el-image>
  </section>
</template>

<script>
export default {
  name: 'PenguinFightMartialRefine',
  data() {
    return {
      imgSrc: 'http://img.anlan.xyz/ledou/linli/jinglian.png'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
