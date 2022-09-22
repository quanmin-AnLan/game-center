<template>
  <iframe :src="$store.state.OutlinkSrc" v-if="$store.state.showOutlink"></iframe>
</template>

<script>
export default {
  name: 'AlOutlink',
  methods: {
    handleCancel() {
      this.$store.commit('SetShowOutlink', false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
