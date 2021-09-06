export type notebook = {
  id: number
  title: string
  userId:number
  createdAt: string
  updatedAt: string
  noteCounts: number
  friendlyCreatedAt?: string
  friendlyUpdatedAt?: string
}
export type notebooks = {
  data: notebook[]
}

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