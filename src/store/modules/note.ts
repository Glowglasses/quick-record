import Note from '@/apis/notes';
import {note, notes} from '@/helpers/noteType';
import {Message} from 'element-ui';

type state = {
  notes: any,
  currentNoteId: any
}
const state = {
  notes: null,
  currentNoteId: undefined
};

const getters = {
  notes: (state: state) => state.notes || {},
  currentNote: (state: state) => {
    if (!Array.isArray(state.notes)) return {title: '', content: ''};
    if (!state.currentNoteId) return state.notes[0] || {title: '', content: ''};
    return state.notes.find(note => note.id == state.currentNoteId) || {title: '', content: ''};
  }
};

const mutations = {
  setNote(state: state, payload: { notes: notes }) {
    state.notes = payload.notes.data;
  },

  addNote(state: state, payload: { note: note }) {
    state.notes.unshift(payload.note);
  },

  updateNote(state: state, payload: { noteId: number, title: string, content: string }) {
    const note = state.notes.find((note: note) => note.id === payload.noteId) || undefined;
    if (!note) return;
    note.title = payload.title;
    note.content = payload.content;
  },

  deleteNote(state: state, payload: { noteId: number }) {
    state.notes = state.notes.filter((note: note) => note.id !== payload.noteId);
  },

  setCurrentNote(state: state, payload: { [props: string]: number } = {}) {
    state.currentNoteId = payload.currentNoteId;
  }
};

const actions = {
  getNotes({commit, state}: { commit: any, state: any }, {notebookId}: { notebookId: number }) {
    if (state.currentBookId === notebookId) return Promise.resolve();
    return Note.getAll({notebookId})
      .then(response => {
        commit('setNote', {notes: response});
      });
  },

  addNote({commit}: { commit: any }, {
    notebookId,
    title,
    content
  }: { notebookId: number, title: string, content: string }) {
    return Note.addNote({notebookId}, {title, content})
      .then(response => {
        commit('addNote', {note: response.data});
      });
  },

  updateNote({commit}: { commit: any }, {noteId, title, content}: { noteId: number, title: string, content: string }) {
    return Note.updateNote({noteId}, {title, content})
      .then(() => {
        commit('updateNote', {noteId, title, content});
      });
  },

  deleteNote({commit}: { commit: any }, {noteId}: { noteId: number }) {
    return Note.deleteNote({noteId})
      .then(response => {
        commit('deleteNote', {noteId});
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