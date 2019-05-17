import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)
const store = new Vuex.Store({
  state() {
    return {
      requestCount: 0,
      isLoadingShown: false,
      currentUser: null
    }
  },
  getters: {

  },
  mutations,
  actions,
  modules: {},
  strict: process.env.NODE_ENV !== 'production'
})
export default store