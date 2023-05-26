<template>
  <div>
    <button @click="sendMessage">发送消息</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      this.$webSocket.send("Hello, WebSocket!"); // 发送消息
    },
  },
};
</script>
