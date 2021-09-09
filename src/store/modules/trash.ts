import Trash from '@/apis/trash';
import {Message} from 'element-ui';
import {note} from '@/helpers/noteType';
import {notebook} from '@/helpers/notebookType';

type state = {
  trashNotes: any
  currentTrashNoteId: any
}
const state: state = {
  trashNotes: null,
  currentTrashNoteId: undefined
};

const getters = {
  trashNotes: (state: state) => state.trashNotes || [],

  currentTrashNote: (state: state, getters: any) => {
    if (!state.currentTrashNoteId) return getters.trashNotes[0] || {};
    return state.trashNotes.find((note: note) => note.id == state.currentTrashNoteId) || {};
  },

  belongTo: (state: state, getters: any, rootState: any, rootGetters: any) => {
    rootState = JSON.parse(JSON.stringify(rootState));
    if (!rootGetters.notebooks || !state.currentTrashNoteId) return;
    const notebook = rootState.notebook.notebooks.find((notebook: notebook) => notebook.id == getters.currentTrashNote.notebookId) || {};
    return notebook.title || '';
  }
};

const mutations = {
  setTrashNotes(state: state, payload: { trashNotes: note[] }) {
    state.trashNotes = payload.trashNotes;
  },

  deleteTrashNote(state: any, payload: { noteId: number }) {
    state.trashNotes = state.trashNotes.filter((note: note) => note.id != payload.noteId);
  },

  setCurrentTrashNote(state: any, payload: { [props: string]: string } = {}) {
    state.currentTrashNoteId = parseInt(payload.currentTrashNoteId);
  }

};

const actions = {
  getTrashNotes({commit, state}: { commit: any, state: any }) {
    return Trash.getAll()
      .then(response => {
        commit('setTrashNotes', {trashNotes: response.data});
      });
  },

  deleteTrashNote({commit}: { commit: any }, {noteId}: { noteId: number }) {
    return Trash.deleteNote({noteId})
      .then(response => {
        commit('deleteTrashNote', {noteId});
        Message.success(response.msg);
      });
  },

  revertTrashNote({commit}: { commit: any }, {noteId}: { noteId: number }) {
    return Trash.revertNote({noteId})
      .then(response => {
        commit('deleteTrashNote', {noteId});
        Message.success(response.msg);
      });
  }

};


export default {
  state,
  getters,
  mutations,
  actions
};