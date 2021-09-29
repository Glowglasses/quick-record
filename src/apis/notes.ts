import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';
import {CreateNote, DeleteNote, Notes, UpdateNote} from '@/helpers/noteType';

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
};

export default {
  getAll({notebookId}: { notebookId: number }): Promise<Notes> {
    return new Promise((resolve, reject) => {
      request<Notes>(URL.GET.replace(':notebookId', notebookId + ''))
        .then(response => {
          response.data = response.data.map(note => {
            note.createdAtFriendly = friendlyDate(note.createdAt);
            note.updatedAtFriendly = friendlyDate(note.updatedAt);
            return note;
          }).sort((note1, note2) => {
            return Date.parse(note2.updatedAt) - Date.parse(note1.updatedAt);
          });
          resolve(response);
        }).catch(err => {
        reject(err);
      });
    });
  },

  updateNote({noteId}: { noteId: number }, {title, content}: { title: string, content: string }) {
    return request<UpdateNote>(URL.UPDATE.replace(':noteId', noteId + ''), 'PATCH', {title, content});
  },

  deleteNote({noteId}: { noteId: number }) {
    return request<DeleteNote>(URL.DELETE.replace(':noteId', noteId + ''), 'DELETE');
  },

  addNote({notebookId}: { notebookId: number }, {title = '', content = ''} = {
    title: '',
    content: ''
  }): Promise<CreateNote> {
    return new Promise((resolve, reject) => {
      request<CreateNote>(URL.ADD.replace(':notebookId', notebookId + ''), 'POST', {title, content})
        .then(response => {
          if (!response.data) return;
          response.data.createdAtFriendly = friendlyDate(response.data.createdAt);
          response.data.updatedAtFriendly = friendlyDate(response.data.updatedAt);
          resolve(response);
        }).catch(err => {
        reject(err);
      });
    });
  }

};