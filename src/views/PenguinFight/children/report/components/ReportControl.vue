<template>
  <section>
    <div class="control-box">
      <el-button type="info" @click="dialogShow('rule')">查看规则</el-button>
      <el-button type="success" @click="dialogShow('addReport')">新增举报</el-button>
      <el-button type="danger" v-if="userInfo.level > 4" @click="clear()">清空</el-button>
    </div>

    <el-dialog title="规则" :visible.sync="ruleShow">
      <div>仅兼容PC浏览器，手机用户请自便</div>
      <div>在此页面举报等同于联系安澜举报</div>
      <div>安澜定期获取当前页面所有举报信息并上报</div>
      <div>若下方举报列表为空，则代表之前举报名单已被提交</div>
      <div>在此举报被受理不代表举报成功，仅代表安澜将名单提交给官方</div>
      <div>本页面为安澜私人网站，非官方举报途径，最终解释权归安澜所有</div>
    </el-dialog>

    <el-dialog title="新增举报" :visible.sync="addReportShow">
      <report-alert @close="dialogClose('addReport')" @refresh="refresh()"></report-alert>
    </el-dialog>

  </section>
</template>

<script>
import ReportAlert from './ReportAlert.vue'
import apis from '@/api'
export default {
  data() {
    return {
      ruleShow: false,
      addReportShow: false
    }
  },
  components: {
    ReportAlert
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    dialogShow(key) {
      this[key + 'Show'] = true
    },
    dialogClose(key) {
      this[key + 'Show'] = false;
    },
    clear() {
      apis.clearReport().then(() => {
        this.refresh()
      })
    },
    refresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="less" scoped>
.control-box {
  display: flex;
  justify-content: space-around;
  margin: 30px 20px;
}
</style>
