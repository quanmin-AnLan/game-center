<template>
  <el-dialog :visible="loginVisible">
    <el-input v-model="username" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" placeholder="请输入密码"></el-input>
    <el-input v-model="repeatPwd" placeholder="请再次输入密码" v-if="type === 'register'"></el-input>
    <al-upload @imgSrc="getImgSrc" v-if="type === 'register'"></al-upload>
    <span slot="footer" class="dialog-footer" v-if="type === 'login'">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="login">登 录</el-button>
      <el-button type="primary" @click="type = 'register'">还没账号？去注册</el-button>
    </span>
    <span slot="footer" class="dialog-footer" v-else>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="register">注 册</el-button>
    </span>
  </el-dialog>
</template>

<script>
import apis from '@/api'
export default {
  name: 'AlLogin',
  props: {
    loginVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type: 'login',
      username: '',
      password: '',
      repeatPwd: '',
      imgSrc: ''
    }
  },
  methods: {
    register() {
      if (this.password !== this.repeatPwd) {
        this.$message.error('两次输入密码不一致！')
        return
      }
      const params = {
        user: this.username,
        password: this.password,
        imgSrc: this.imgSrc
      }
      apis.register(params).then(res => {
        if (res.success === true) {
          this.$message.success('注册成功')
          this.handleCancel()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    login() {
      const params = {
        user: this.username,
        password: this.password
      }
      apis.login(params).then(res => {
        if (res.success === true) {
          this.$message.success('登录成功')
          this.handleCancel()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getImgSrc(src) {
      this.imgSrc = src || ''
    },
    handleCancel() {
      this.$emit('update:loginVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
