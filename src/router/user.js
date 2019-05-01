import UserSignIn from '@/layouts/user/sign_in'
import UserDashboard from '@/layouts/user/dashboard'
import UserResetPassword from '@/layouts/user/reset_password'
import {
  logoutConfirm
} from './middlewares'

const UserRouter = [{
  path: '/user/sign_in',
  name: 'UserSignIn',
  component: UserSignIn
}, {
  path: '/user/dashboard',
  name: 'UserDashboard',
  component: UserDashboard
}, {
  path: '/',
  name: 'UserIndex',
  redirect: {
    name: 'UserDashboard'
  }
}, {
  path: '/user/reset_password',
  name: 'UserResetPassword',
  component: UserResetPassword
}, {
  path: '/user/logout',
  name: 'UserLogout',
  beforeEnter: logoutConfirm
}]
export default UserRouter