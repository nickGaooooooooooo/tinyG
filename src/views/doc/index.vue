<template>
    <TinyEditor class="quill-editor" ref="editor" :content="questionContent" :disabled="readOnly" @initMenu="initMenu">
    </TinyEditor>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TinyEditor from './components/MyTiny.vue';

const emit = defineEmits(['initMenu'])

const initMenu = () => {
    emit('initMenu')
}

const save = () => {
    // 获取富文本的字符串
    // let string = editor.value.getContents()
}
const readOnly = ref()
const questionContent = ref()

</script>

<style scoped lang="scss">
.quill-editor {
    min-width: 1500px;
    height: 100%;
}
</style>
    