import {
  Message,
  MessageBox
} from 'element-ui'
import {
  logoutUser
} from '@/api/user'
import store from '@/store'

const logoutConfirm = (to, from, next) => {
  MessageBox.confirm('是否确定退出登录?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logoutUser().then(res => {
      Message.success({
        message: '成功退出登录',
        onClose: () => {
          localStorage.removeItem('token')
          next({
            name: 'UserSignIn'
          })
        }
      })
    })
  }).catch(() => {
    next(false)
  })
}
const loginRequired = (to, from, next) => {
  if (store.state.currentUser) {
    next()
  } else {
    store.dispatch('getCurrentUser').then(user => {
      if (!user) {
        next({
          name: 'UserSignIn',
          query: {
            redirect_url: to.name
          }
        })
      } else {
        next()
      }
    })
  }
}
export {
  loginRequired,
  logoutConfirm
}