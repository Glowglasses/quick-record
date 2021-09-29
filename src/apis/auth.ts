import request from '@/helpers/request'
import {GetInfo, Login, Logout, Register} from '@/helpers/authType';

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
    return request<Register>(URL.REGISTER, 'POST', user)
  },

  login(user: user){
    return request<Login>(URL.LOGIN, 'POST', user)
  },

  logout() {
    return request<Logout>(URL.LOGOUT)
  },

  getInfo() {
    return request<GetInfo>(URL.GET_INFO)
  }
}