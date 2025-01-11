import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../../application/stores/authStore';

const routes = [

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'), 
    meta: { requiresAuth: true },
    children: [
      {
        path: 'journal',
        name: 'journal',
        component: () => import('../views/JournalView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'watchlist',
        name: 'watchlist',
        component: () => import('../views/WatchListView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isPublicRoute = !to.meta.requiresAuth;

  if (!isAuthenticated && !isPublicRoute) {
    return next('/login');
  }

  if (isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return next('/dashboard/journal');
  }

  return next();
});

export default router;
