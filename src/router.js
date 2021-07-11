import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('./views/Home.vue')
    }, {
        path: '/login',
        component: () => import('./views/Login.vue')
    }, {
        path: '/center',
        name: 'center',
        component: () => import('./views/Center.vue'),
        redirect: '/center/user',
        children: [
            {
                path: 'edit',
                name: 'edit',
                component: () => import('./components/EditDoc.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('./views/User.vue')
            },
        ]
    }, {
        path: '/log',
        name: 'log',
        component: () => import('./views/Log.vue'),
    }, {
        path: '/article/:id',
        name: 'article',
        component: () => import('./views/Article.vue')
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;