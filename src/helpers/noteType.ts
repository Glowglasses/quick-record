export type Note = {
  isDelete: boolean
  id: number
  title: string
  content: string
  userId: number
  updatedAt: string
  createdAt: string
  createdAtFriendly?: string
  updatedAtFriendly?: string
}
export type CreateNote = {
  msg: string
  data?: Note
}

export type Notes = {
  data: Note[]
}

export type DeleteNote = {
  msg: string
}

export type UpdateNote = {
  msg: string
}

export type RevertNote = {
  msg: string
}

export type Trash = {
  msg?: string
  data:Note[]
}