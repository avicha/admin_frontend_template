export default {
  showLoading(state) {
    state.isLoadingShown = true
  },
  hideLoading(state) {
    state.isLoadingShown = false
  },
  increaseRequestCount(state) {
    state.requestCount++
  },
  decreaseRequestCount(state) {
    state.requestCount--
  },
  setCurrentUser(state, user) {
    state.currentUser = user
  }
}