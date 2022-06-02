<template>
  <section class="error">
    <div class="top">404 Not Found</div>
    <div class="fixed">
      <div class="error-img-box">
        <el-image style="width: 100%" src="http://img.anlan.xyz/404.jpg?imagelim" alt="error" fit="fill" lazy></el-image>
      </div>
      <div>您输入的网址已被安澜吃掉，请更换正确的网址</div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    document.querySelector('.nav-main').style.display = 'none';
  },
};
</script>

<style lang="less" scoped>
.error {
  font-weight: bold;
  .top {
    font-size: 24px;
    margin-top: 30px;
  }
  .fixed {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 378px;
    height: 350px;
    margin-left: -189px;
    margin-top: -200px;
    font-size: 18px;
    color: red;
    .error-img-box {
      width: 373px;
      height: 320px;
    }
  }
}
</style>