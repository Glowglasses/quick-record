export type notebook = {
  id: number
  title: string
  userId:number
  createdAt: string
  updatedAt: string
  noteCount: number
  friendlyCreatedAt?: string
}
export type notebooks = notebook[]

export type createNotebook = {
  msg: string
  data: notebook
}

export type updateNotebook = {
  msg: string
}

export type deleteNotebook = {
  msg: string
}