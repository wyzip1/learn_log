<template>
    <div id="edit" ref="el" @input="db"></div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from "vue";
import { debounce } from "../../util";

import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";

const props = defineProps({
    // theme: String,
    height: { type: String, default: "500px" },
    vertical: { type: Boolean, default: true },
    modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

const editor = ref();
const el = ref();

function emitModelValue() {
    emits("update:modelValue", editor.value.getMarkdown());
}

const db = debounce(emitModelValue, 300);

onMounted(() => {
    editor.value = new Editor({
        el: el.value,
        previewStyle: props.vertical ? "vertical" : "tab",
        height: props.height,
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    });
});

const w = watch(props, (newProps) => {
    if (!el.value) return;

    el.value.childNodes.forEach((node) => node.remove());

    editor.value = new Editor({
        el: el.value,
        previewStyle: props.vertical ? "vertical" : "tab",
        height: newProps.height,
        initialValue: newProps.modelValue,
        // theme: "dark",
        plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
    });
    w();
});
</script>

<style>
.ProseMirror {
    font-family: "微软雅黑";
}
</style>
