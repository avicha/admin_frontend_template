import Vue from 'vue'
import Router from 'vue-router'
import UserRouter from './user'

Vue.use(Router)

export default new Router({
  routes: [].concat(UserRouter),
  mode: 'history'
})