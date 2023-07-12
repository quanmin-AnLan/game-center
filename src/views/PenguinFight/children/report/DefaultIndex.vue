<template>
  <div v-if="!userInfo.level">请登录，登录后刷新页面</div>
  <section v-else>
    <report-control @refresh="refresh()"></report-control>
    <report-table ref="table"></report-table>
  </section>
</template>

<script>
import ReportControl from './components/ReportControl.vue'
import ReportTable from './components/ReportTable.vue'
export default {
  components: {
    ReportControl,
    ReportTable
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  methods: {
    refresh() {
      this.$refs.table.getList()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
