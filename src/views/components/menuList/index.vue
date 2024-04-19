<template>
    <template v-for="item of menuData" :key="item">
        <el-menu-item v-if="item.type !== 'folder' && item.type !== 'workItem'" :index="item.id" @click="
            handleSelectPage(
                item.id,
                item.type,
                item.label,
                item.parentId,
                item.docId,
                item.workItemTypeId
            )
            ">
            <template #title>
                <span>{{ item.label }}</span>
            </template>
        </el-menu-item>
        <el-sub-menu v-else :index="item.id" :id="item.id">
            <template #title>
                <span style="width: 100%;">{{ item.label }}</span>
            </template>
            <MenuList :menuData="item.children" />
        </el-sub-menu>
    </template>
</template>
  
<script lang="ts">
export default {
    name: "MenuList",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["menuData"]);

const handleSelectPage = (
    id: string,
    type: string,
    label: string,
    parentId: string,
    docId: string,
    workItemTypeId: string
) => {
    //点击底层目录跳转页面方法
    // console.log("select", id, type);

};
const handleSelectSpace = (id: string, label: string, type: string) => {
    // console.log('点击空间', label, id)
    document.getElementById(`${id}`)?.setAttribute("class", "el-sub-menu active");
    switch (true) {
        case type == "workItem":
            router.push("/project/workItem");
            break;
        default:
            router.push(`/project/menuOverview/${label}/${id}`);
            break;
    }
};
defineExpose({ handleSelectPage });
const test = (id: any, name: string) => {
    console.log("点击点击点击", id, name);
};
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
  