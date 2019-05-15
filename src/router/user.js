const UserIndex = () =>
  import('@/layouts/user/index')
const UserSignIn = () =>
  import('@/layouts/user/sign_in')
const UserDashboard = () =>
  import('@/layouts/user/dashboard')
const UserResetPassword = () =>
  import('@/layouts/user/reset_password')
import {
  loginRequired,
  logoutConfirm
} from './middlewares'

const UserRouter = {
  path: '/user',
  name: 'UserIndex',
  component: UserIndex,
  children: [{
    path: 'sign_in',
    name: 'UserSignIn',
    component: UserSignIn
  }, {
    path: 'dashboard',
    name: 'UserDashboard',
    beforeEnter: loginRequired,
    component: UserDashboard
  }, {
    path: 'reset_password',
    name: 'UserResetPassword',
    beforeEnter: loginRequired,
    component: UserResetPassword
  }, {
    path: 'logout',
    name: 'UserLogout',
    beforeEnter: logoutConfirm
  }]
}
export default UserRouter