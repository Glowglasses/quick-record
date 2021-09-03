import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import NotebookList from '@/components/NotebookList.vue';
import Login from '@/views/Login.vue';
import NoteDetail from '@/components/NoteDetail.vue';
import TrashDetail from '@/components/TrashDetail.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/notebooks',
    component: NotebookList
  },
  {
    path: '/noteId',
    component: NoteDetail
  },
  {
    path: '/trash',
    component: TrashDetail
  }
];

const router = new VueRouter({
  routes
});

export default router;
