<template>
  <div id="webSocket">
    <button @click="sendMessage">发送消息</button>
  </div>
</template>

<script>
export default {
  name: "webSocket",
  mounted() {
    this.$WebSocket.send("Hello, WebSocket!"); // 发送消息
    this.$WebSocket.onmessage = (event) => {
      console.log("收到消息：", event.data);
    };
  },
};
</script>
