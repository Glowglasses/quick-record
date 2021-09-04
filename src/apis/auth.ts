import request from '@/helpers/request'
import {getInfo, login, logout, register} from '@/helpers/authType';

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
    return request<register>(URL.REGISTER, 'POST', user)
  },

  login(user: user){
    return request<login>(URL.LOGIN, 'POST', user)
  },

  logout() {
    return request<logout>(URL.LOGOUT)
  },

  getInfo() {
    return request<getInfo>(URL.GET_INFO)
  }
}