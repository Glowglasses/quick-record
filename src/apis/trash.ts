import request from '@/helpers/request';
import {friendlyDate} from '@/helpers/util';
import {DeleteNote, RevertNote, Trash} from '@/helpers/noteType';

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
};

export default {
  getAll(): Promise<Trash> {
    return new Promise((resolve, reject) => {
      request<Trash>(URL.GET)
        .then(response => {
          response.data = response.data.sort((note1, note2) => Date.parse(note2.updatedAt) - Date.parse(note1.updatedAt));
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
    return request<DeleteNote>(URL.DELETE.replace(':noteId', noteId + ''), 'DELETE');
  },

  revertNote({noteId}: { noteId: number }) {
    return request<RevertNote>(URL.REVERT.replace(':noteId', noteId + ''), 'PATCH');
  }

};