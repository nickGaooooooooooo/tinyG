import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/index.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: "/",
        name: "Page",
        component: () => import("../views/index.vue"),
        children: [{
            path: 'doc',
            name: 'Doc',
            component: () => import("../views/doc/index.vue"),
        }]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
