<template>
  <div class="menu">
    <el-menu :default-active="$route.name" :router="true" :default-openeds="['Project', 'Other']">
      <el-menu-item index="UserDashboard" :route="{name: 'UserDashboard'}">首页</el-menu-item>
      <el-submenu index="Project">
        <template slot="title">项目管理</template>
        <el-menu-item index="ProjectList" :route="{name: 'ProjectList'}">项目列表</el-menu-item>
      </el-submenu>
      <el-submenu index="Other">
        <template slot="title">其他</template>
        <el-menu-item index="DevelopmentRule" :route="{name: 'DevelopmentRule'}">开发规范</el-menu-item>
        <el-menu-item index="AboutMe" :route="{name: 'AboutMe'}">关于作者</el-menu-item>
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
    >.el-menu-item {
      color: #bfcbd9;
      background-color: #324157;

      &.is-active {
        color: #1f9eff;
      }
    }
    >.el-submenu {
      .el-submenu__title {
        color: #bfcbd9;
        background-color: #324157;
      }
    }
  }
}
</style>