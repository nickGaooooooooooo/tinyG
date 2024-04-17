import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/index.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // 其他路由配置
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
