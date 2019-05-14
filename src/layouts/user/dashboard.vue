<template>
<div class="user-dashboard-page">
  <p class="title">欢迎您回来，亲爱的{{ user.username }}，上次登录时间：{{ new Date(user.last_login_time) | formatDate('yyyy-MM-dd HH:mm:ss') }}</p>
</div>
</template>

<script>
import Vue from 'vue'
import { formatDate } from '@/filters/formatter'
import { currentUser } from '@/api/user'
export default {
  name: 'UserDashboard',
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        last_login_time: Date.now()
      }
    }
  },
  filters: {
    formatDate
  },
  computed: {

  },
  created() {
    currentUser().then(user => {
      if (!user) {
        this.$router.push({ name: 'UserSignIn', query: { redirect_url: this.$route.name } })
      } else {
        this.user = user
        localStorage.setItem('username', user.nickname || user.username)
      }
    })
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
