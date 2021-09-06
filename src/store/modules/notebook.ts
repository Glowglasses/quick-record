import {notebook, notebooks} from '@/helpers/notebookType';
import Notebooks from '@/apis/notebooks';
import {Message} from 'element-ui';

type state = {
  notebooks: notebook[]
}
const state: state = {
  notebooks: []
};

const getters = {
  notebooks: (state: state) => state.notebooks
};

const mutations = {
  setNotebooks(state: state, payload: { notebooks: notebooks }) {
    state.notebooks = payload.notebooks.data;
  },
  addNotebook(state: state, payload: { notebook: notebook }) {
    state.notebooks.unshift(payload.notebook);
  },
  updateNotebook(state: state, payload: { notebookId: number, title: string }) {
    const notebook = state.notebooks.find(notebook => notebook.id === payload.notebookId);
    if (notebook) notebook.title = payload.title;
  },
  deleteNotebook(state: state, payload: { notebookId: number }) {
    state.notebooks = state.notebooks.filter(notebook => notebook.id != payload.notebookId);
  }
};

const actions = {
  getNotebooks({commit, state}: { commit: any, state: state }) {
    if (!state.notebooks) return Promise.resolve();
    return Notebooks.getAll().then((response) => {
      console.log(response);
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