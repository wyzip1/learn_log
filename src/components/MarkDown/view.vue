<template>
    <div id="view" ref="el"></div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted } from "vue";

import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
// import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";

const viewer = ref();
const el = ref();

const props = defineProps({
    // theme: String,
    height: { type: String, default: "500px" },
    content: { type: String, default: "" },
});

watch(
    props,
    (newProps) => {
        if (!el.value) return;

        el.value.childNodes.forEach((node) => node.remove());

        viewer.value = Editor.factory({
            el: el.value,
            viewer: true,
            height: newProps.height,
            initialValue: newProps.content,
            // theme: "dark",
            plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
        });
    },
    { immediate: true }
);
</script>
