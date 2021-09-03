import request from '@/helpers/request'

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
}

type user = {
  username: string
  password: string
}

export default {
  register(user: user) {
    return request(URL.REGISTER, 'POST', user)
  },

  login(user: user) {
    return request(URL.LOGIN, 'POST', user)
  },

  logout() {
    return request(URL.LOGOUT)
  },

  getInfo() {
    return request(URL.GET_INFO)
  }
}