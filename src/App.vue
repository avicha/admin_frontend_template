<template>
<div id="app">
  <router-view class="page" ref="page" v-if="['UserSignIn'].includes(pageName)"></router-view>
  <el-container v-else>
    <el-header class="header">
      <div class="logo">后台管理后台</div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="UserResetPassword">重置密码</el-dropdown-item>
          <el-dropdown-item command="UserLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view class="page" ref="page"></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>
<script>
import Vue from 'vue'
import { Container, Header, Aside, Main, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

import Menu from '@/components/menu'
import API from '@/api'

export default {
  name: 'App',
  computed: {
    pageName() {
      return this.$route.name
    },
    username() {
      return localStorage.getItem('username')
    }
  },
  components: {
    Menu
  },
  created() {
    this.defineApiErrorHandler()
  },
  methods: {
    defineApiErrorHandler() {
      API.defineErrorFetchHandler(json => {
        let code = json.code
        this.$message.error({
          message: json.message,
          duration: 2000,
          onClose: () => {
            if (code == 401001 || code == 440001) {
              localStorage.removeItem('token')
              this.$router.push({ name: 'UserSignIn', query: { redirect_url: this.$route.name } })
            }
          }
        })
      })
    },
    handleCommand(command) {
      this.$router.push({ name: command })
    }
  }
}
</script>
<style lang="scss">
@import '~scss/base';

#app {
    .header {
        background-color: #242f42;
        font-size: 22px;
        color: #fafafa;
        .logo {
            line-height: 60px;
            float: left;
            width: 250px;
        }
        .el-dropdown {
            line-height: 60px;
            float: right;
            .el-dropdown-link {
                color: #fafafa;
                cursor: pointer;
            }
        }
    }
    .el-aside {
        display: block;
        position: absolute;
        top: 60px;
        left: 0;
        bottom: 0;
        .menu {
            height: 100%;
            background-color: #324157 !important;
        }
    }
    .el-main {
        background-color: #f0f0f0;
        display: block;
        position: absolute;
        top: 60px;
        left: 250px;
        right: 0;
        bottom: 0;
        .page {
            height: 100%;
            overflow-y: scroll;
        }
    }
}
</style>
