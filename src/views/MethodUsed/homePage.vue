<template>
  <div id="MethodUsed">
    关于组建封装的展示和使用,预期模拟效果类似于element组件封装一下。
    <socket />
  </div>
</template>

<script>
import socket from "./components/SocketTest.vue";
export default {
  name: "MethodUsed",
  data() {
    return {
      webscoketData: "",
    };
  },
  components: {
    socket,
  },
  methods: {},
};
</script>

<style lang="less" scoped >
</style>