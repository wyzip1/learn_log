import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios';

const routes = [
    {
        path: '/',
        component: () => import('./views/Home.vue')
    }, {
        path: '/login',
        component: () => import('./views/Login.vue')
    }, {
        path: '/center',
        component: () => import('./views/Center.vue'),
        beforeEnter: async (to, from, next) => {
            let { data } = await axios.post('/auth');
            if (data.status) next('/login')
            else next();
        }
    }, {
        path: '/article/:id',
        component: () => import('./views/Article.vue')
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

export default router;