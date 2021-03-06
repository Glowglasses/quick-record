import Auth from '@/apis/auth';
import {User} from '@/helpers/authType';
import router from '@/router';

type state = {
  user: any
}
const state: state = {
  user: null
};

const getters = {
  username: (state: state) => state.user === null ? '未登录' : state.user.username,

  slug: (state: state) => state.user === null ? '未' : state.user.username.charAt(0)
};

const mutations = {
  setUser(state: state, payload: { user: User }) {
    state.user = payload.user;
  }
};

const actions = {
  login({commit}: { commit: any }, {username, password}: { username: string, password: string }) {
    return Auth.login({username, password})
      .then(response => {
        commit('setUser', {user: response.data});
      });
  },

  register({commit}: { commit: any }, {username, password}: { username: string, password: string }) {
    return Auth.register({username, password})
      .then(response => {
        commit('setUser', {user: response.data});
      });
  },

  logout({commit}: { commit: any }) {
    return Auth.logout()
      .then(() => {
        commit('setUser', {user: null});
        router.replace({path: '/login'}).then();
      });
  },

  checkLogin({commit, state}: { commit: any, state: any }, payload: { path: string } = {path: '/'}) {
    if (state.user !== null) return Promise.resolve();
    return Auth.getInfo()
      .then(response => {
        if (!response.isLogin) {
          router.replace(payload).catch(() => {return;});
        } else {
          commit('setUser', {user: response.data});
        }
      });
  }

};
export default {
  state,
  getters,
  mutations,
  actions
};