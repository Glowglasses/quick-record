import {Notebook, Notebooks} from '@/helpers/notebookType';
import notebooks from '@/apis/notebooks';
import {Message} from 'element-ui';

type state = {
  notebooks: any
  currentBook: any
  currentBookId: any
}
const state: state = {
  notebooks: {},
  currentBook: null,
  currentBookId: undefined
};

const getters = {
  notebooks: (state: state) => state.notebooks,
  currentBook: (state: state) => {
    if (!Array.isArray(state.notebooks)) return {};
    if (!state.currentBookId) return state.notebooks[0] || {};
    return state.notebooks.find(notebook => notebook.id == state.currentBookId) || {};
  }
};

const mutations = {
  setNotebooks(state: state, payload: { notebooks: Notebooks }) {
    state.notebooks = payload.notebooks.data;
  },
  addNotebook(state: state, payload: { notebook: Notebook }) {
    if (state && state.notebooks) state.notebooks.unshift(payload.notebook);
  },
  updateNotebook(state: state, payload: { notebookId: number, title: string }) {
    if (!state || !state.notebooks) return;
    const notebook = state.notebooks.find((notebook: Notebook) => notebook.id === payload.notebookId);
    if (notebook) notebook.title = payload.title;
  },
  deleteNotebook(state: state, payload: { notebookId: number }) {
    if (state && state.notebooks) state.notebooks = state.notebooks.filter((notebook: Notebook) => notebook.id != payload.notebookId);
  },
  setCurrentBook(state: state, payload: { [props: string]: number } = {}) {
    state.currentBookId = payload.currentBookId;
  }
};

const actions = {
  getNotebooks({commit}: { commit: any, state: state }) {
    return notebooks.getAll().then((response) => {
      commit('setNotebooks', {notebooks: response});
    });
  },
  addNotebook({commit}: { commit: any, state: state }, payload: { title: string }) {
    return notebooks.addNotebook({title: payload.title}).then(response => {
      commit('addNotebook', {notebook: response.data});
    });
  },
  updateNotebook({commit}: { commit: any }, payload: { notebookId: number, title: string }) {
    return notebooks.updateNotebook(payload.notebookId, {title: payload.title})
      .then(res => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title});
        Message.success(res.msg);
      });
  },

  deleteNotebook({commit}: { commit: any }, payload: { notebookId: number }) {
    return notebooks.deleteNotebook(payload.notebookId)
      .then(response => {
        commit('deleteNotebook', {notebookId: payload.notebookId});
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