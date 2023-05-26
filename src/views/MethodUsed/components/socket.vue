<template>
  <div id="webSocket"></div>
</template>

<script>
// 使用实范
export default {
  name: "webSocket",
  mounted() {
    // 连接到WebSocket服务器
    this.$websocket
      .connect()
      .then(() => {
        console.log("WebSocket connected");
        // 设置接收消息时的回调函数
        this.$websocket.onMessage((message) => {
          console.log("Received message:", message);
        });
      })
      .catch((error) => {
        console.error("WebSocket error:", error);
      });
  },
  methods: {
    // 向服务器发送消息的方法
    sendMessage() {
      this.$websocket.sendMessage("Hello, WebSocket!");
    },
  },
  beforeDestroy() {
    // 断开与WebSocket服务器的连接
    this.$websocket.disconnect();
  },
};
</script>
<style lang="less" scoped >
</style>