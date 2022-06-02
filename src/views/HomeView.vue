<template>
  <div class="home">
    <el-image class="logo" src="http://img.anlan.xyz/anlan.jpg?imagelim" fit="fill" alt="安澜logo" lazy></el-image>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
.logo {
  width: 300px;
  height: 300px;
  margin-top: 30px;
}
</style>
