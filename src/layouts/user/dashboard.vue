<template>
  <div class="user-dashboard-page">
    <p class="title">欢迎您回来，亲爱的{{ currentUser.username }}，上次登录时间：{{ new Date(currentUser.last_login_time) | formatDate('yyyy-MM-dd HH:mm:ss') }}</p>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { formatDate } from '@/filters/formatter'
import { currentUser } from '@/api/user'

export default {
  name: 'UserDashboard',
  computed: mapState(['currentUser']),
  filters: {
    formatDate
  }
}
</script>
<style lang="scss">
.user-dashboard-page {
  padding: 20px;
  background-color: #fff;
  .title {
    font-size: 20px;
    color: #1f9eff;
  }
  .admin-info-table {
    margin-top: 20px;
    .el-table__header-wrapper {
      display: none;
    }
  }
}
</style>