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
  name: 'ToolsIndex',
  data() {
    return {
      list: [
        {
          text: 'LOL',
          click: () => {
            this.$router.push('/Tools/lol')
          }
        },
        {
          text: '云顶之弈',
          click: () => {
            this.$router.push('/Tools/tft')
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
