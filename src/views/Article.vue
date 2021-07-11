<template>
    <div class="container">
        <h1>{{ doc.title }}</h1>
        <p>{{ doc.type }}</p>
        <span>{{ doc.updateTime }}--{{ doc.account }}</span>
        <div class="content" ref="con"></div>
    </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import { getChapterInfo } from "../api/chapter";

const rendererMD = new marked.Renderer();
const route = useRoute();
const doc = ref({});
const con = ref();

marked.setOptions({
    renderer: rendererMD,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
}); //基本设置

onMounted(async () => {
    let res = await getChapterInfo(route.params.id);
    let { data } = res.meta;
    doc.value = data;
    console.log(doc);
    con.value.innerHTML = marked(data.content).replace(
        /<pre>/g,
        "<pre class='hljs'>"
    );
});
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;
    min-height: calc(100vh - 60px);
    box-sizing: border-box;
    background-image: url("../assets/login-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.container .content {
    width: 75vw;
    padding: 25px 50px;
    border-top: 1px solid #eee;
    margin-top: 25px;
    background-color: rgba(255, 255, 255, 0.6);
    min-height: 65vh;
}
</style>