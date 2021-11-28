import { createRouter, createWebHistory } from 'vue-router'
import { getUserInfo } from './util'
import store from './store';
import { auth } from './config/axios-options';

const routes = [
    {
        path: '/',
        component: () => import('./views/Home/index.vue')
    }, {
        path: '/login',
        redirect: '/login/index',
        component: () => import('./views/Login/index.vue'),
        children: [
            {
                path: 'index',
                component: () => import('./views/Login/Login/index.vue')
            },
            {
                path: 'register',
                component: () => import('./views/Login/Register/index.vue')
            }
        ]
    }, {
        path: '/category',
        component: () => import('./views/Category/index.vue')
    }, {
        path: '/center',
        component: () => import('./views/Center/index.vue'),
        beforeEnter: (to, from) => {
            auth();
        },
        redirect: '/center/index',
        children: [
            {
                path: 'index',
                component: () => import('./views/Center/managerArticle/index.vue')
            }, {
                path: 'type',
                component: () => import('./views/Center/managerType/index.vue')
            }, {
                path: 'edit',
                component: () => import('./views/Center/EditArticle/index.vue')
            }
        ]
    }, {
        path: '/article/:id',
        component: () => import('./views/Article/index.vue')
    }
];

const router = new createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(() => {
    const userInfo = getUserInfo();

    store.commit('changeLoginState', userInfo.login || false)
    return true
})

export default router;