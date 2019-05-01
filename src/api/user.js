import API from './index'
const API_PREFIX = `${process.env.API_HOST}/user`

export const signInUser = (data) => {
  return API.postJson(`${API_PREFIX}/sign_in`, data)
}

export const currentUser = () => {
  return API.get(`${API_PREFIX}/current`)
}

export const resetPasswordUser = (data) => {
  return API.put(`${API_PREFIX}/reset_password`, data)
}

export const logoutUser = () => {
  return API.put(`${API_PREFIX}/logout`)
}