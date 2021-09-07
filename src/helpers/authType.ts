export type user = {
  id: number
  username: string
  updatedAt: string
  createdAt: string
}
export type register = {
  msg: string
  data: user
}

export type getInfo = {
  isLogin: boolean
  data?: user
}

export type logout = {
  msg: string
}

export type login = {
  msg: string
  data?: user
}
