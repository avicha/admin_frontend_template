<template>
<div class="user-sign-in-page">
  <div class="sign-in-panel">
    <div class="company-info">
      <div class="title">后台管理后台</div>
      <div class="desc">这是一个代码模板</div>
      <p class="text-muted">Tel: 13632324433</p>
      <p class="text-muted">E-mail: avichabc@gmail.com</p>
      <p class="text-muted">Website: <a href="http://www.etech.work">http://www.etech.work</a></p>
    </div>
    <el-form class="login-form" :model="user" @submit.native.prevent="signIn" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model.trim="user.username" name="username" placeholder="请输入用户名" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model.trim="user.password" name="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signIn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import { Form, FormItem, Input, Button } from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
import { signInUser } from '@/api/user'

export default {
  name: 'UserSignIn',
  data() {
    return {
      title: '登录',
      user: {
        username: '',
        password: ''
      },
      redirect_url: this.$route.query.redirect_url
    }
  },
  methods: {
    signIn() {
      signInUser(this.user).then(({ result }) => {
        if (result.token) {
          localStorage.setItem('token', result.token)
          this.$router.push({ name: this.redirect_url || 'UserDashboard' })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '~scss/mixin';

.user-sign-in-page {
    min-height: 100vh;
    position: relative;

    .sign-in-panel {
        width: 800px;
        margin: 200px auto 0;
        border: 1px solid #e5e5e5;
        padding: 40px 0;
        display: flex;

        .company-info {
            flex: 1;
            padding: 0 40px;
            border-right: 1px solid #e5e5e5;

            .desc,
            .title {
                color: #666;
            }

            .title {
                font-size: 28px;
            }

            .desc {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .text-muted {
                color: #999;
                line-height: 1.6em;
            }
        }

        .login-form {
            flex: 1;
            padding: 0 40px;
        }
    }
}
</style>
