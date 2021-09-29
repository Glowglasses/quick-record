import note from '@/apis/notes';
import {Note, Notes} from '@/helpers/noteType';
import {Message} from 'element-ui';

type State = {
  notes: any,
  currentNoteId: any
}
const state = {
  notes: null,
  currentNoteId: undefined
};

const getters = {
  notes: (state: State) => state.notes || {},
  currentNote: (state: State) => {
    if (!Array.isArray(state.notes)) return {title: '', content: ''};
    if (!state.currentNoteId) return state.notes[0] || {title: '', content: ''};
    return state.notes.find(note => note.id == state.currentNoteId) || {title: '', content: ''};
  }
};

const mutations = {
  setNote(state: State, payload: { notes: Notes }) {
    state.notes = payload.notes.data;
  },

  addNote(state: State, payload: { note: Note }) {
    state.notes.unshift(payload.note);
  },

  updateNote(state: State, payload: { noteId: number, title: string, content: string }) {
    const note = state.notes.find((note: Note) => note.id === payload.noteId) || undefined;
    if (!note) return;
    note.title = payload.title;
    note.content = payload.content;
  },

  deleteNote(state: State, payload: { noteId: number }) {
    state.notes = state.notes.filter((note: Note) => note.id !== payload.noteId);
  },

  setCurrentNote(state: State, payload: { [props: string]: number } = {}) {
    state.currentNoteId = payload.currentNoteId;
  }
};

const actions = {
  getNotes({commit, state}: { commit: any, state: any }, {notebookId}: { notebookId: number }) {
    if (state.currentBookId === notebookId) return Promise.resolve();
    return note.getAll({notebookId})
      .then(response => {
        commit('setNote', {notes: response});
      });
  },

  addNote({commit}: { commit: any }, {
    notebookId,
    title,
    content
  }: { notebookId: number, title: string, content: string }) {
    return note.addNote({notebookId}, {title, content})
      .then(response => {
        commit('addNote', {note: response.data});
      });
  },

  updateNote({commit}: { commit: any }, {noteId, title, content}: { noteId: number, title: string, content: string }) {
    return note.updateNote({noteId}, {title, content})
      .then(() => {
        commit('updateNote', {noteId, title, content});
      });
  },

  deleteNote({commit}: { commit: any }, {noteId}: { noteId: number }) {
    return note.deleteNote({noteId})
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