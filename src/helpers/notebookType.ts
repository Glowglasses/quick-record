export type Notebook = {
  id: number
  title: string
  userId:number
  createdAt: string
  updatedAt: string
  noteCounts: number
  friendlyCreatedAt?: string
  friendlyUpdatedAt?: string
}
export type Notebooks = {
  data: Notebook[]
}

export type CreateNotebook = {
  msg: string
  data: Notebook
}

export type UpdateNotebook = {
  msg: string
}

export type DeleteNotebook = {
  msg: string
}