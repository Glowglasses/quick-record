import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SlideBar from '@/components/SideBar.vue';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.component('SlideBar', SlideBar);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');