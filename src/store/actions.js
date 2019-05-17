import { currentUser } from '@/api/user'

export default {
  async getCurrentUser({ commit }) {
    const user = await currentUser()
    commit('setCurrentUser', user)
    return user
  }
}