import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';
import {createNotebook, deleteNotebook, notebooks, updateNotebook} from '@/helpers/notebookType';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:id',
  DELETE: '/notebooks/:id'
};

export default {
  getAll(): Promise<notebooks> {
    return new Promise((resolve, reject) => {
      request<notebooks>(URL.GET)
        .then(response => {
          response.data = response.data.sort((notebook1, notebook2) => Date.parse(notebook2.createdAt) - Date.parse(notebook1.createdAt));
          response.data.forEach(notebook => {
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt);
            notebook.friendlyUpdatedAt = friendlyDate(notebook.updatedAt)
          });
          resolve(response);
        }).catch(err => {
        reject(err);
      });
    });
  },

  updateNotebook(notebookId: number, {title = ''} = {title: ''}) {
    return request<updateNotebook>(URL.UPDATE.replace(':id', notebookId + ''), 'PATCH', {title});
  },

  deleteNotebook(notebookId: number) {
    return request<deleteNotebook>(URL.DELETE.replace(':id', notebookId + ''), 'DELETE');
  },

  addNotebook({title = ''} = {title: ''}):Promise<createNotebook> {
    return new Promise((resolve,reject) => {
      request<createNotebook>(URL.ADD, 'POST', {title}).then((response) => {
        response.data.friendlyCreatedAt = friendlyDate(response.data.createdAt)
        response.data.friendlyUpdatedAt = friendlyDate(response.data.updatedAt)
        resolve(response)
      }).catch((error)=>{
        reject(error)
      });
    })
  }

};