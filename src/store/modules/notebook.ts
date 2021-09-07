import {notebook, notebooks} from '@/helpers/notebookType';
import Notebooks from '@/apis/notebooks';
import {Message} from 'element-ui';

type state = {
  notebooks: notebook[]
  currentBook: any
  currentBookId: any
}
const state: state = {
  notebooks: [],
  currentBook: undefined,
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
  setNotebooks(state: state, payload: { notebooks: notebooks }) {
    state.notebooks = payload.notebooks.data;
  },
  addNotebook(state: state, payload: { notebook: notebook }) {
    if (state && state.notebooks) state.notebooks.unshift(payload.notebook);
  },
  updateNotebook(state: state, payload: { notebookId: number, title: string }) {
    if (!state || !state.notebooks) return;
    const notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId);
    if (notebook) notebook.title = payload.title;
  },
  deleteNotebook(state: state, payload: { notebookId: number }) {
    if (state && state.notebooks) state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId);
  },
  setCurrentBook(state:state,payload:{currentBookId: number}){
    state.currentBookId = payload.currentBookId
  }
};

const actions = {
  getNotebooks({commit, state}: { commit: any, state: state }) {
    if (!state.notebooks) return Promise.resolve();
    return Notebooks.getAll().then((response) => {
      commit('setNotebooks', {notebooks: response});
    });
  },
  addNotebook({commit}: { commit: any, state: state }, payload: { title: string }) {
    return Notebooks.addNotebook({title: payload.title}).then(response => {
      commit('addNotebook', {notebook: response.data});
    });
  },
  updateNotebook({commit}: { commit: any }, payload: { notebookId: number, title: string }) {
    return Notebooks.updateNotebook(payload.notebookId, {title: payload.title})
      .then(res => {
        commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title});
        Message.success(res.msg);
      });
  },

  deleteNotebook({commit}: { commit: any }, payload: { notebookId: number }) {
    return Notebooks.deleteNotebook(payload.notebookId)
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