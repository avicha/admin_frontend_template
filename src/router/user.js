import UserIndex from '@/layouts/user/index'
import UserSignIn from '@/layouts/user/sign_in'
import UserDashboard from '@/layouts/user/dashboard'
import UserResetPassword from '@/layouts/user/reset_password'
import {
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
    component: UserDashboard
  }, {
    path: 'reset_password',
    name: 'UserResetPassword',
    component: UserResetPassword
  }, {
    path: 'logout',
    name: 'UserLogout',
    beforeEnter: logoutConfirm
  }]
}
export default UserRouter