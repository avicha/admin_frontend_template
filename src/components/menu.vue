<template>
<div class="menu">
  <el-menu :default-active="$route.name" :router="true" :default-openeds="['Product', 'Video', 'Other']">
    <el-menu-item index="UserDashboard" :route="{name: 'UserDashboard'}">首页</el-menu-item>
    <el-submenu index="Product">
      <template slot="title">产品管理</template>
      <el-menu-item index="ProductList" :route="{name: 'ProductList'}">产品列表</el-menu-item>
    </el-submenu>
    <el-submenu index="Video">
      <template slot="title">视频管理</template>
      <el-menu-item index="VideoList" :route="{name: 'VideoList'}">视频列表</el-menu-item>
      <el-menu-item index="MyVideoList" :route="{name: 'MyVideoList'}">我的视频</el-menu-item>
    </el-submenu>
    <el-submenu index="Other">
      <template slot="title">其他功能</template>
      <el-menu-item index="ResetPassword" :route="{name: 'ResetPassword'}">修改密码</el-menu-item>
      <el-menu-item index="Logout" :route="{name: 'Logout'}">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>
<script>
import Vue from 'vue'
import { Menu, Submenu, MenuItem } from 'element-ui'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)

export default {
  name: 'Menu'
}
</script>
<style lang="scss">
.menu {
    .el-menu {
        background-color: #324157;
        > .el-menu-item {
            color: #bfcbd9;
            background-color: #324157;

            &.is-active {
                color: #1f9eff;
            }
        }
        > .el-submenu {
            .el-submenu__title {
                color: #bfcbd9;
                background-color: #324157;
            }
        }
    }
}
</style>
