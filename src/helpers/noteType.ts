type note = {
  isDelete: boolean
  id: number
  title: string
  content: string
  userId: number
  updateAt: string
  createAt: string
}
export type createNote = {
  msg: string
  data?: note
}

export type Notes = {
  data: note[]
}

export type deleteNote = {
  msg: string
}

export type updateNote  = {
  msg: string
}

export type revertNote = {
  msg: string
}

export type trash = {
  msg?: string
  data:note[]
}