<template>
    <div class="page">
        <Editor :value="emailForm.msg" @updateValue="getMsg" />
    </div>
</template>

<script setup>
import { reactive } from "vue";
import Editor from './components/quill.vue'

const emailForm = reactive({
    test_msg: ''
})
const getMsg = (val) => {
    emailForm.msg = val
}
</script>