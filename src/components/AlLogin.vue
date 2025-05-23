<template>
  <el-dialog :visible="$store.state.app.loginVisible" @close="handleCancel" :title="typeMap[type]">
    <li v-for="(item, index) in config" :key="index">
      <template v-if="item.scene.indexOf(type) > -1">
        <div class="common-input-box">
          <div class="common-input-line">
            <div class="common-input-label"><span v-if="item.required">*</span>{{item.name}}</div>
            <el-input clearable :placeholder="item.placeholder" v-model.trim="item.value" :class="item.prop"
              v-if="item.type === 'input'" :show-password="item.password" class="common-input-value"
              @input="(value) => { removeWrongCls(item.prop, value) }"></el-input>
          </div>
        </div>
      </template>
    </li>
    <span slot="footer" v-if="type === 'login'">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="login">登 录</el-button>
      <el-button type="primary" @click="type = 'register'">还没账号？去注册</el-button>
    </span>
    <span slot="footer" v-else>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="register">注 册</el-button>
    </span>
  </el-dialog>
</template>

<script>
import apis from '@/api'
export default {
  name: 'AlLogin',
  data() {
    return {
      type: 'login',
      config: [
        {
          name: '用户名：', // name字段用于展示在前面，通知用户要填什么
          type: 'input', // type字段为该项类型
          required: true, // 是否必填
          prop: 'user', // 动态附加class使校验必填时精准定位该项，及提交时字段名取此字段
          placeholder: '请输入用户名', // 输入提示语，且用于必填校验二次提示
          value: '',  // 获取用户输入值
          scene: ['login', 'register'], // 该项在什么场景下可见
          submit: true // 提交时是否需要此字段
        },
        {
          name: '密码：',
          type: 'input',
          required: true,
          prop: 'password',
          placeholder: '请输入密码',
          value: '',
          scene: ['login', 'register'],
          password: true,
          submit: true
        },
        {
          name: '二次确认：',
          type: 'input',
          required: true,
          prop: 'repeatPwd',
          placeholder: '请再次输入密码',
          value: '',
          scene: ['register'],
          password: true,
          submit: false
        }
      ],
      typeMap: {
        login: '登录',
        register: '注册'
      }
    }
  },
  methods: {
    // 注册
    register() {
      if (!this.checkData()) {
        return
      }
      const params = {}
      for (const item of this.config) {
        if (item.submit) {
          params[item.prop] = item.value
        }
      }
      apis.register(params).then(res => {
        if (res.success) {
          this.handleCancel()
        }
      })
    },
    // 登录
    login() {
      if (!this.checkData()) {
        return
      }
      const params = {}
      for (const item of this.config) {
        if (item.submit) {
          params[item.prop] = item.value
        }
      }
      apis.login(params).then(res => {
        if (res.uuid) {
          const baseData = res
          baseData.level = Number(baseData.level)
          this.$store.dispatch('app/UpdateUserInfo', baseData)
          this.handleCancel()
        }
      })
    },
    // 取消事件
    handleCancel() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$store.dispatch('app/UpdateLoginVisible', false)
    },
    // 动态去除红色高亮样式
    removeWrongCls(prop, value) {
      if (Array.isArray(value) && value.length) {
        document.querySelector(`.${prop} .el-input__inner`).classList.remove('wrongful')
      } else if (!Array.isArray(value) && value) {
        document.querySelector(`.${prop} .el-input__inner`).classList.remove('wrongful')
      }
    },
    // 提交校验
    checkData() {
      let result = true
      for (const item of this.config) {
        if (item.required && item.scene.indexOf(this.type) > -1) {
          let value = item.value
          if (!value || (Array.isArray(value) && value.length === 0)) {
            result = false
            document.querySelector(`.${item.prop} .el-input__inner`).classList.add('wrongful')
            setTimeout(() => {
              this.$message.warning(`${item.placeholder}！`)
            }, 500)
          }
        }
      }
      if (result && this.type === 'register') {
        const password = this.config.find(item => item.prop === 'password')
        const repeatPwd = this.config.find(item => item.prop === 'repeatPwd')
        if (password.value !== repeatPwd.value) {
          this.$message.error('两次输入密码不一致！')
          return
        }
      }
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.common-input-line {
  width: 100%;
  margin-bottom: 16px;
}
.common-input-label {
  line-height: 40px;
  margin-right: 24px;
}
</style>
