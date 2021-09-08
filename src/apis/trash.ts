import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';
import {deleteNote, revertNote, trash} from '@/helpers/noteType';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
};

export default {
  getAll(): Promise<trash> {
    return new Promise((resolve, reject) => {
      request<trash>(URL.GET)
        .then(response => {
          response.data = response.data.sort((note1, note2) => Date.parse(note2.createdAt) - Date.parse(note2.createdAt));
          response.data.forEach(note => {
            note.createdAtFriendly = friendlyDate(note.createdAt);
            note.updatedAtFriendly = friendlyDate(note.updatedAt);
          });
          resolve(response);
        }).catch(err => {
        reject(err);
      });
    });
  },

  deleteNote({noteId}: { noteId: number }) {
    return request<deleteNote>(URL.DELETE.replace(':noteId', noteId + ''), 'DELETE');
  },

  revertNote({noteId}: { noteId: number }) {
    return request<revertNote>(URL.REVERT.replace(':noteId', noteId + ''), 'PATCH');
  }

};