<template>
    <div class="home">
        123
        <el-button>进入系统</el-button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import Head from "../components/Head.vue";
import MenuList from "../components/menuList/index.vue";

const menuList = ref([
    {
        id: 'home',
        name: 'home',
        label: '主页',
        icon: 'WorkItem',
        path: '/project/home',
        parentId: '',
        children: []
    },
    {
        id: 'test',
        name: 'test',
        label: '测试页',
        icon: 'Document',
        path: '/project/home',
        parentId: '',
        children: []
    },
]);
const defaultId = ref('home')
</script>
<style scoped>
.home {
    width: 100%;
    height: 100%;
}
</style>