<template>
  <div>
    <div class="button-box">
      <el-button v-for="(item, index) in list" @click="item.click" :key="index">{{ item.text }}</el-button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'MonitorIndex',
  data() {
    return {
      list: [
        {
          text: '工具',
          click: () => {
            this.$router.push('/Monitor/tool')
          }
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.button-box {
  margin: 24px 0;
}
</style>
