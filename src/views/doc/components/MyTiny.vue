<template>
    <div v-loading="loading" class="editor-box">
        <div class="tinymce-editor">
            <Editor v-model="myValue" :init="init" :disabled="false" />
        </div>
        <div class="sidebar"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRefs } from 'vue'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

tinymce.baseURL = 'tinymce'
const init = ref(
    {
        placeholder: '在这里输入文字',
        language_url: '/tinymce/langs/zh_Hans.js', // 汉化路径
        language: 'zh_Hans',
        skin_url: '/tinymce/skins/ui/oxide',
        height: window.innerHeight, // 编辑器高度，可以考虑获取窗口高度，以适配不同设备屏幕
        promotion: false, //去除右上角的“Upgrade”的促销按钮
        menubar: false, //菜单栏，true为显示，false可隐藏
        statusbar: false, //控制元素路径显示
        quickbars_insert_toolbar: false, //禁用每行开头处自动弹出的工具栏
        quickbars_selection_toolbar: false, // 禁用选中文本时的工具栏
        license_key: 'gpl',
        plugins: 'accordion  anchor autolink  autosave charmap code codesample directionality emoticons fullscreen image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount kityformula-editor formatpainter comment toc',
        toolbar: 'styles save action undo redo formatpainter blocks bold italic geshi fontfamily fontsize removeformat workItem bullist numlist alignment comment table insertImg searchreplace secondarySidebar version help'
    },
)
const saveDoc = () => { }
const loading = ref(false)
const myValue = ref('')
onMounted(() => {
    initDoc()
})
const initDoc = () => { }
const test = () => {
    // console.log('myValue', myValue?.value)
}
</script>
<style scoped lang="scss">
.editor-box {
    display: flex;
    height: 100%;
    overflow: hidden;
    .tinymce-editor {
        flex: 1;
        height: 100%;
    }
    .sidebar{
        flex: 0 0 500px;
    }
}
</style>
