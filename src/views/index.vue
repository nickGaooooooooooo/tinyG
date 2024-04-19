<template>
    <div class="home">
        <div class="left">
            <el-menu :default-active="defaultId" class="el-menu-vertical-demo" background-color="#005f87" text-color="#fff">
                <MenuList :menuData="menuList" />
                <div style="border: 1px solid #0f789b"></div>
            </el-menu>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import Head from "./components/Head.vue";
import MenuList from "./components/menuList/index.vue";

const menuList = ref([
    {
        id: 'home',
        name: 'home',
        label: '主页',
        icon: 'WorkItem',
        type: 'page',
        parentId: '',
        children: []
    },
    {
        id: 'test',
        name: 'test',
        label: '测试页',
        icon: 'Document',
        type: 'page',
        parentId: '',
        children: []
    },
    {
        id: 'tiny',
        name: 'tiny',
        label: '文档页',
        icon: 'Document',
        type: 'folder',
        parentId: '',
        children: [
            {
                id: 'test1',
                name: 'test1',
                label: '测试页1',
                icon: 'Document',
                type: 'page',
                parentId: '',
                children: []
            },
        ]
    },
]);
const defaultId = ref('home')
</script>
<style scoped lang="scss">
.home {
    display: flex;
    width: 100%;
    height: 100%;

    .left {
        flex: 1;
        padding: 0 0 0 10px;
        height: 100%;
        .el-menu-vertical-demo{
            height: 100%;
            border-radius: 5px;
        }
    }

    .right {
        flex: 9;
        height: 100%;
    }

    .main {
        background-color: #f5f5f5;
    }
}
</style>