import {
  Message,
  MessageBox
} from 'element-ui'
import {
  currentUser,
  logoutUser
} from '@/api/user'
import g from '@/g'

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
  if (g.user.username) {
    next()
  } else {
    currentUser().then(user => {
      if (!user) {
        next({
          name: 'UserSignIn',
          query: {
            redirect_url: to.name
          }
        })
      } else {
        Object.assign(g.user, user)
        next()
      }
    })
  }
}
export {
  loginRequired,
  logoutConfirm
}