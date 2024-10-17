import * as vueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
  },
  {
    path: '/config/',
    name: 'Config',
    component: () => import('../views/config/index.vue'),
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: () => import('../views/error/404.vue'),
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
