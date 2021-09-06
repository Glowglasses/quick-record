import Vue from 'vue'
import Vuex from 'vuex'
import notebook from '@/store/moduls/notebook'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notebook
  }
})
