type data = {
  id: number
  username: string
  updatedAt: string
  createdAt: string
}
export type register = {
  msg: string
  data: data
}

export type getInfo = {
  isLogin: boolean
  data?: data
}

export type logout = {
  msg: string
}

export type login = {
  msg: string
  data?: data
}
