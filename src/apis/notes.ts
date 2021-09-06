import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';
import {createNote, deleteNote, notes, updateNote} from '@/helpers/noteType';

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
};

export default {
  getAll({notebookId}: { notebookId: number }): Promise<notes> {
    return new Promise((resolve, reject) => {
      request<notes>(URL.GET.replace(':notebookId', notebookId + ''))
        .then(response => {
          response.data = response.data.map(note => {
            note.createdAtFriendly = friendlyDate(note.createdAt);
            note.updatedAtFriendly = friendlyDate(note.updatedAt);
            return note;
          }).sort((note1, note2) => {
            return Date.parse(note2.updatedAt) - Date.parse(note2.updatedAt);
          });
          resolve(response);
        }).catch(err => {
        reject(err);
      });
    });
  },

  updateNote({noteId}: { noteId: number }, {title, content}: { title: string, content: string }) {
    return request<updateNote>(URL.UPDATE.replace(':noteId', noteId + ''), 'PATCH', {title, content});
  },

  deleteNote({noteId}: { noteId: number }) {
    return request<deleteNote>(URL.DELETE.replace(':noteId', noteId + ''), 'DELETE');
  },

  addNote({notebookId}: { notebookId: number }, {title = '', content = ''} = {
    title: '',
    content: ''
  }): Promise<createNote> {
    return new Promise((resolve, reject) => {
      request<createNote>(URL.ADD.replace(':notebookId', notebookId + ''), 'POST', {title, content})
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