import Vue from 'vue'
import Router from 'vue-router'
import UserRouter from './user'
import EntityRouter from './entity'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    redirect: {
      name: 'UserDashboard'
    }
  }].concat(UserRouter, EntityRouter),
  mode: 'history'
})