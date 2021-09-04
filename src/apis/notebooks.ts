import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'
import {notebooks, updateNotebook} from '@/helpers/notebookType';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
}

export default {
  getAll(){
    return new Promise((resolve, reject) => {
      request<notebooks>(URL.GET)
        .then(response => {
          response = response.sort((notebook1, notebook2) => Date.parse(notebook1.createdAt) - Date.parse(notebook2.createdAt))
          response.forEach(notebook=>{
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
          })
          resolve(response)
        }).catch(err => {
        reject(err)
      })
    })
  },

  updateNotebook(notebookId: string, { title = '' } = { title: '' }) {
    return request<updateNotebook>(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
  },

  deleteNotebook(notebookId: string) {
    return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
  },

  addNotebook({ title = ''} = { title: ''}) {
    return request(URL.ADD, 'POST', { title })
  }

}