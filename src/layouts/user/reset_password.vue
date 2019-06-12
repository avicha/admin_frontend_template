<template>
  <div class="user-reset-password-page">
    <el-form class="reset-password-form" label-position="left" label-width="80px">
      <el-form-item label="旧密码">
        <el-input type="password" name="old_password" v-model="old_password" placeholder="请输入你的旧密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" name="new_password" v-model="new_password" placeholder="请输入你的新密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" name="confirm_password" v-model="confirm_password" placeholder="请再次输入你的新密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Vue from 'vue'
import { Form, FormItem, Input, Button } from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
import { resetPasswordUser } from '@/api/user'
export default {
  name: 'UserResetPassword',
  data() {
    return {
      old_password: '',
      new_password: '',
      confirm_password: ''
    }
  },
  methods: {
    resetPassword() {
      if (!this.old_password || !this.new_password || !this.confirm_password) {
        this.$message({
          message: '请输入旧密码、新密码、确认密码',
          type: 'error'
        })
      } else {
        if (this.confirm_password !== this.new_password) {
          this.$message({
            message: '您输入的新密码和确认密码不一致，请重新确认后输入',
            type: 'error'
          })
          this.new_password = ''
          this.confirm_password = ''
        } else {
          resetPasswordUser({ old_password: this.old_password, new_password: this.new_password }).then(() => {
            this.$message({
              message: '修改密码成功，请重新登录',
              type: 'success',
              onClose: () => {
                localStorage.removeItem('token')
                this.$router.push({ name: 'UserSignIn' })
              }
            })
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.user-reset-password-page {
  background-color: #fff;
  .reset-password-form {
    margin: 0 auto;
    padding: 150px 0;
    width: 500px;
  }
}
</style>