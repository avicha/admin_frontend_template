// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Loading,
  Message,
  MessageBox,
  Notification
} from 'element-ui'
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

import App from './App'
import router from './router'
import store from './store'
import API from '@/api'

const defineApiHandler = () => {
  API.defineBeboreFetchHandler(() => {
    store.commit('increaseRequestCount')
    store.commit('showLoading')
  })
  API.defineAfterFetchHandler(() => {
    store.commit('decreaseRequestCount')
    if (!store.state.requestCount) {
      store.commit('hideLoading')
    }
  })
}
defineApiHandler()
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})