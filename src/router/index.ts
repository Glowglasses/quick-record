import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    alias: '/notebooks',
    component: () => import('@/components/NotebookList.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/note',
    component: () => import('@/components/NoteDetail.vue')
  },
  {
    path: '/trash',
    component: () => import('@/components/TrashDetail.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
