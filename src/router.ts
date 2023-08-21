import { createRouter, createWebHistory } from 'vue-router';
import AuthLayout from './layouts/Auth.vue';
import { useAuthStore } from '@/stores/auth';
import Login from '@/pages/auth/Login.vue';

const StatusPage = { template: '<div>Alive!!</div>' };

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        { path: '/login', component: Login, meta: { layout: AuthLayout }, name: 'login' },

        {
            name: 'overview',
            path: '/overview',
            meta: { auth: true },
            component: () => import('@/pages/overview/Index.vue')
        },
        {
            name: 'accounts',
            path: '/accounts',
            meta: { auth: true },
            component: () => import('@/pages/accounts/Index.vue')
        },
        {
            name: 'transactions',
            path: '/transactions',
            meta: { auth: true },
            component: () => import('@/pages/transactions/Index.vue')
        },

        // Status check
        { path: '/health', component: StatusPage, meta: { layout: AuthLayout }, name: 'status.ping' },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            redirect: () => ({ name: 'overview' })
        },

    ],
});

router.beforeEach((to, _from, next) => {
    const { token } = useAuthStore();

    if (!token && to.meta.auth) {
        localStorage.setItem('urlIntended', to.path);

        next({ name: 'login' });
    } else if (!to.meta.auth && token) {
        next({ name: 'overview' });
    } else {
        next();
    }
});

export default router;
