<template>
    <div class="container">
        <div class="head">
            <Input
                placeholder="请输入标题"
                class="title"
                v-model="title"
                @input="localSave"
            />
        </div>
        <div @change="chooseType" style="min-height: 21px">
            <label v-for="i in type" :key="i._id" class="type">
                <input
                    type="radio"
                    :value="i._id"
                    name="type"
                    :checked="typeId === i._id"
                />
                <span>{{ i.name }}</span>
            </label>
        </div>
        <section>
            <textarea
                placeholder="请写点什么......"
                v-model="value"
                @input="change"
                @keydown.tab="insertTabToTextarea"
                class="edit"
            ></textarea>
            <div class="show" ref="show"></div>
        </section>
        <div class="footer">
            <Button class="submit" :value="txt" @click="submit" />
            <Button value="返回" class="back" @click="back" />
        </div>
    </div>
</template>

<script setup>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"; // 引入高亮样式 这里我用的是sublime样式
import { ref, onMounted } from "vue";
import Input from "../components/Form/Input.vue";
import Button from "../components/Form/Button.vue";
import { getType } from "../api/type";
import { addChapter, getChapterInfo } from "../api/chapter";
import { debounce } from "../util";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const value = ref();
const show = ref();
const type = ref();
const title = ref();
const typeId = ref();
const txt = ref("提交");

onMounted(async () => {
    const rendererMD = new marked.Renderer();
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

    let data = await getType();
    type.value = data.meta.data;
    let { mode, chapterId } = route.query;
    let editMarked;
    if (!mode)
        editMarked = JSON.parse(localStorage.getItem("editMarked") || "[]");
    else {
        txt.value = "更新";
        let res = await getChapterInfo(chapterId);
        editMarked = res.meta.data;
    }
    value.value = editMarked.content || "";
    title.value = editMarked.title || "";
    typeId.value = editMarked.typeId || type.value[0]._id;
    render();
});

const change = debounce(() => {
    render();
    if (route.query.mode) return;
    localSave();
}, 600);

const localSave = debounce(() => {
    localStorage.setItem(
        "editMarked",
        JSON.stringify({
            title: title.value,
            typeId: typeId.value,
            content: value.value,
        })
    );
    console.log("save to localStorage at editMarked");
}, 600);

function render() {
    show.value.innerHTML = marked(value.value).replace(
        /<pre>/g,
        "<pre class='hljs'>"
    );
}

function chooseType({ target }) {
    typeId.value = target.value;
    localSave();
}

function submit() {
    let userId = JSON.parse(localStorage.getItem("userInfo"))._id;
    addChapter({
        title: title.value,
        typeId: typeId.value,
        content: value.value,
        userId,
    }).then((res) => {
        console.log(res);
        localStorage.setItem("editMarked", "");
        alert("提交文章成功");
    });
}

function back() {
    router.back();
}

function insertTabToTextarea(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 9) {
        e.preventDefault();
        var start = e.target.selectionStart,
            end = e.target.selectionEnd;

        e.target.value =
            e.target.value.substring(0, start) +
            "\t" +
            e.target.value.substring(end);

        e.target.selectionStart = e.target.selectionEnd = start + 1;
    }
}
</script>

<style scoped>
.head {
    display: flex;
    justify-content: space-around;
    gap: 50px;
}

.container {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("../assets/login-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.container section {
    margin: 15px auto 0;
    width: 90%;
    display: flex;
    height: 70%;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
}

.edit,
.show {
    box-sizing: border-box;
    width: 40%;
    height: 100%;
    padding: 25px;
}

.edit {
    border: none;
    outline: none;
    resize: none;
    font-size: 18px;
    /* font-stretch */
}

.show {
    overflow: auto;
    width: 60%;
    background-color: #eee;
}

.submit,
.back {
    width: 240px;
    margin: 40px auto 0;
}

.title {
    width: 45vw;
    margin-top: 40px;
    height: 45px;
}

.title:deep() input {
    text-align: center;
    font-size: 25px;
}

.type {
    margin: 0 15px;
    cursor: pointer;
}
.type input {
    margin-right: 5px;
}

.footer {
    display: flex;
    gap: 45px;
}
</style>