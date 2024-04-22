import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '../views/home/index.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/page",
        name: "Page",
        component: () => import("../views/index.vue"),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import("../views/home/index.vue"),
            },
            {
                path: 'doc',
                name: 'Doc',
                component: () => import("../views/doc/index.vue"),
            },
            {
                path: 'test',
                name: 'Test',
                component: () => import("../views/test/index.vue"),
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
