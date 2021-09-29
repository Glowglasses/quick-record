export type User = {
  id: number
  username: string
  updatedAt: string
  createdAt: string
}
export type Register = {
  msg: string
  data: User
}

export type GetInfo = {
  isLogin: boolean
  data?: User
}

export type Logout = {
  msg: string
}

export type Login = {
  msg: string
  data?: User
}
