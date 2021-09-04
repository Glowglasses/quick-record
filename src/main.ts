import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SlideBar from '@/components/SlideBar.vue';
import {Toast} from 'vant';

Vue.config.productionTip = false
Vue.component("SlideBar",SlideBar)
Vue.use(Toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')