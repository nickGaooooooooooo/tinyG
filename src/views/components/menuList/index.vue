<template>
    <template v-for="item of menuData" :key="item">
        <el-menu-item v-if="item.type !== 'folder' && item.type !== 'workItem'" :index="item.id"
            @click=" handleSelectPage(item.id, item.name)">
            <template #title>
                <span>{{ item.label }}</span>
            </template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.id" :id="item.id">
            <template #title>
                <span>{{ item.label }}</span>
            </template>
            <MenuList :menuData="item.children" />
        </el-sub-menu>
    </template>
</template>
<script>
export default {
    name: "MenuList",
};
</script>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["menuData"]);
const handleSelectPage = (id, name) => {
    router.push(`/page/${name}`);

};
const handleSelectSpace = (id) => {
};
defineExpose({ handleSelectPage });

</script>
<style scoped>
.icon {
    margin-right: 5px;
}

.el-menu-item:hover {
    background-color: #2387aa !important;
}

:deep(.el-sub-menu__title):hover {
    background-color: #2387aa !important;
}

:deep(.el-sub-menu__title).is-active {
    background-color: #2387aa !important;
}

.el-menu-item.is-active {
    background-color: #004669 !important;
    color: #fff;
}

.el-sub-menu.is-active>.el-sub-menu__title {
    background-color: aqua !important;
    /* color: aqua !important; */
}

.icon-label {
    width: 100%;
}

:deep(.icon-label .icon-label__label) {
    flex: 1;
}
</style>
  