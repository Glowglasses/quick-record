import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import SlideBar from '@/components/SlideBar.vue';

Vue.config.productionTip = false
Vue.component("SlideBar",SlideBar)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')