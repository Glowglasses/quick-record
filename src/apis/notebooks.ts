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

  addNotebook({title = ''} = {title: ''}) {
    return request<createNotebook>(URL.ADD, 'POST', {title});
  }

};